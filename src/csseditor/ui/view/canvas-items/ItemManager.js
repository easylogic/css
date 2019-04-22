import UIElement, { EVENT } from "../../../../util/UIElement";
import { html } from "../../../../util/functions/func";
import {
  LOAD,
  POINTERSTART,
  MOVE,
  PREVENT,
  STOP,
  KEY_ALT,
  END,
  MOUSEOVER,
  MOUSEOUT
} from "../../../../util/Event";
import {
  CHANGE_RECT,
  CHANGE_ARTBOARD,
  CHANGE_LAYER,
  CHANGE_SELECTION,
  CHANGE_EDITOR,
  COPY_ITEMS,
  CHANGE_INSPECTOR
} from "../../../types/event";
import { EMPTY_STRING } from "../../../../util/css/types";
import { editor } from "../../../../editor/editor";
import { itemPositionCalc } from "../../../../editor/ItemPositionCalc";
import { Segment } from "../../../../editor/util/Segment";

export default class ItemManager extends UIElement {
  initialize() {
    super.initialize();

    this.initializeLayerCache();
  }

  templateClass() {
    return `area artboard-area`;
  }

  initializeLayerCache() {
    this.layerItems = {};
    this.titleItems = {};
  }

  getCachedLayerElement(id) {
    if (!this.layerItems[id]) {
      var $el = this.$el.$(`[item-id="${id}"]`);

      this.layerItems[id] = $el;
    }

    return this.layerItems[id];
  }

  getCachedTitleElement(id) {
    if (!this.titleItems[id]) {
      var $el = this.$el.$(`[artboard-id="${id}"]`);
      this.titleItems[id] = $el;
    }

    return this.titleItems[id];
  }

  makeLayer(layer, depth = 0) {
    var children = layer.children;
    var isLayoutItem = layer.isLayoutItem() ? "true" : "false";
    var hasLayout = layer.hasLayout();
    var hasRootItem = layer.isRootItem() ? "true" : "false";
    return html`
      <div
        class="layer"
        item-id="${layer.id}"
        style="${layer.toString()}"
        title="${layer.title}"
        data-depth="${depth}"
        data-layout-item="${isLayoutItem}"
        data-root-item="${hasRootItem}"
        data-has-layout="${hasLayout}"
      >
        ${children.map(it => this.makeLayer(it, depth + 1))}
        <div class="text-layer" style="pointer-events: none;"></div>
      </div>
    `;
  }

  makeArtBoard(artboard) {
    return html`
      <div class="artboard-background" style="${artboard.toBoundString()};">
        <div class="artboard-title" artboard-id="${artboard.id}">
          ${artboard.title}
        </div>
      </div>
      <div
        class="artboard"
        item-id="${artboard.id}"
        title="${artboard.title}"
        style="${artboard.toString()};"
      >
        ${artboard.rootItems.map(layer => this.makeLayer(layer, 0))}
      </div>
    `;
  }

  [LOAD()]() {
    this.initializeLayerCache();
    var project = editor.selection.currentProject;
    if (!project) return EMPTY_STRING;

    var list = project.artboards;

    return list.map(artboard => {
      return this.makeArtBoard(artboard);
    });
  }

  refresh() {
    this.load();

    this.refreshAllLayers();
    // editor.selection.initRect()
    // this.emit('setItemResizer')
    // this.emit('removeGuideLine')
  }

  selectItem(item) {
    if (item && item.isLayoutItem()) {
      itemPositionCalc.clear();
    } else {
      itemPositionCalc.initialize(editor.config.get("selection.direction"));
    }

    // this.emit('removeGuideLine')
  }

  [MOUSEOVER("$el .layer") + PREVENT + STOP](e) {
    var item = editor.get(e.$delegateTarget.attr("item-id"));
  }

  [MOUSEOUT("$el .layer") + PREVENT + STOP](e) {
    var item = editor.get(e.$delegateTarget.attr("item-id"));
  }

  [POINTERSTART("$el .artboard-title") +
    PREVENT +
    STOP +
    MOVE("moveArtBoard") +
    END("moveEndLayer")](e) {
    editor.config.set("selection.mode", "artboard");
    editor.config.set("selection.direction", Segment.MOVE);

    this.$artboardTitleContainer = e.$delegateTarget.parent();
    this.item = editor.get(e.$delegateTarget.attr("artboard-id"));
    this.item.select();
    this.selectItem(this.item);
    this.emit(CHANGE_SELECTION);
  }

  [POINTERSTART("$el .layer") +
    PREVENT +
    STOP +
    MOVE("moveLayer") +
    END("moveEndLayer")](e) {
    editor.config.set("selection.mode", "layer");
    editor.config.set("selection.direction", Segment.MOVE);

    this.item = editor.get(e.$delegateTarget.attr("item-id"));
    this.item.select();

    if (e.altKey) {
      // alt key 누르 상태로 시작하면 copy , 복사본만 움직임
      var ids = editor.copy();
      this.item = editor.get(ids[0]);
      this.item.select();
      this.refresh();
      this.emit(COPY_ITEMS);
    }

    this.selectItem(this.item);

    this.isLayoutItem = this.item.isLayoutItem();
    this.emit(CHANGE_SELECTION);
  }

  matchArtboardTitlePosition(item) {
    var $title = this.getCachedTitleElement(item.id);
    if ($title) {
      $title.parent().cssText(item.toBoundString());
    }
  }

  matchPosition() {
    var items = editor.selection.items;
    for (var i = 0, len = items.length; i < len; i++) {
      var item = items[i];
      itemPositionCalc.recover(item);
      this.getCachedLayerElement(item.id).css(item.toBoundCSS());
      this.matchArtboardTitlePosition(item);
    }

    this.emit("setItemResizer");
  }

  matchGridPosition() {
    editor.send(CHANGE_LAYER);
    this.emit("setItemResizer");
  }

  [EVENT("matchPosition")]() {
    this.matchPosition();
  }

  movePosition(dx, dy) {
    itemPositionCalc.calculateMove(dx, dy);
    // this.emit('setGuideLine');
    this.matchPosition();
  }

  moveArtBoard(dx, dy) {
    this.movePosition(dx, dy);
    this.matchArtboardTitlePosition(this.item);
    this.emit("setGuideLine");
    this.emit(CHANGE_RECT);
  }

  moveLayer(dx, dy) {
    if (!this.isLayoutItem) {
      this.movePosition(dx, dy);
      this.emit("setGuideLine");
      this.emit(CHANGE_RECT);
    }
  }

  moveEndLayer() {
    this.emit(CHANGE_RECT);
  }

  moveResizeEnd() {
    editor.selection.items.forEach(item => this.refreshLayerOffset(item));
  }

  [EVENT("moveResizeEnd")]() {
    this.moveResizeEnd();
  }

  refreshLayerOffset(item) {
    var $el = this.getCachedLayerElement(item.id);

    item.offset = $el.offsetRect();

    item.children.forEach(child => {
      this.refreshLayerOffset(child);
    });
  }

  refreshLayerOne(item) {
    var $el = this.getCachedLayerElement(item.id);

    var content = item.content || EMPTY_STRING;
    $el.$(".text-layer").html(content);

    $el.cssText(item.toString());
    $el.attr("data-layout-item", item.isLayoutItem() ? "true" : "false");
    $el.attr("data-has-layout", item.hasLayout() ? "true" : "false");

    item.offset = $el.offsetRect();

    item.children.forEach(child => {
      this.refreshLayerOne(child);
    });

    this.refreshLayerOffset(item);
  }

  refreshLayer(layers) {
    layers = layers || editor.selection.layers;

    layers.forEach(item => {
      this.refreshLayerOne(item);
    });
  }

  refreshArtBoard(artboards) {
    artboards = artboards || editor.selection.artboards;

    artboards.forEach(artboard => {
      this.refreshArtBoardOne(artboard);
    });
  }

  refreshArtBoardOne(item) {
    var $el = this.getCachedLayerElement(item.id);

    $el.cssText(item.toString());

    item.allLayers.forEach(layer => {
      this.refreshLayerOne(layer);
    });

    this.refreshLayerOffset(item);
  }

  refreshAllLayers() {
    var project = editor.selection.currentProject;
    if (project) {
      project.artboards.forEach(artboard => {
        this.refreshArtBoardOne(artboard);
      });
    }
  }

  [EVENT(CHANGE_INSPECTOR)]() {
    var current = editor.selection.current;

    if (current) {
      if (current.itemType == "artboard") {
        this.refreshArtBoard(editor.selection.artboards);
      } else {
        this.refreshLayer(editor.selection.layers);
      }
    }
  }

  [EVENT(CHANGE_ARTBOARD)](current) {
    var artboards = current ? [current] : editor.selection.artboards;
    this.refreshArtBoard(artboards);
  }

  // indivisual layer effect
  [EVENT(CHANGE_LAYER)](current) {
    var layers = current ? [current] : editor.selection.layers;
    this.refreshLayer(layers);
  }

  [EVENT("refreshItem")](item) {
    item = item || editor.selection.current;
    if (item.itemType == "artboard") {
      this.refreshArtBoard([item]);
    } else if (item.itemType == "layer") {
      this.refreshLayer([item]);
    }
  }

  [EVENT(CHANGE_RECT)](changeType) {
    if (changeType == "grid") {
      this.matchGridPosition();
    } else {
      this.matchPosition();
    }

    // this.emit('removeGuideLine')
  }

  // all effect
  [EVENT("refreshItemManager")]() {
    this.refresh();
    // editor.selection.initRect()
    this.emit("setItemResizer");
    this.emit("removeGuideLine");
  }

  [EVENT(COPY_ITEMS)]() {
    this.refresh();
  }
}
