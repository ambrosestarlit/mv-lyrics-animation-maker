(() => {
  "use strict";

  const CANVAS_WIDTH = 1920;
  const CANVAS_HEIGHT = 1080;
  const CACHE_DB_NAME = "mv-lyrics-animation-maker";
  const CACHE_STORE_NAME = "projects";
  const CACHE_KEY = "autosave";

  const FONT_OPTIONS = [
    { label: "システムゴシック", value: "\"Yu Gothic UI\", \"Yu Gothic\", \"Hiragino Sans\", \"Meiryo\", sans-serif" },
    { label: "Noto Sans JP", value: "\"Noto Sans JP\", sans-serif" },
    { label: "Zen Kaku Gothic New", value: "\"Zen Kaku Gothic New\", sans-serif" },
    { label: "BIZ UDPGothic", value: "\"BIZ UDPGothic\", sans-serif" },
    { label: "BIZ UDGothic", value: "\"BIZ UDGothic\", sans-serif" },
    { label: "M PLUS 1p", value: "\"M PLUS 1p\", sans-serif" },
    { label: "M PLUS 1", value: "\"M PLUS 1\", sans-serif" },
    { label: "M PLUS 2", value: "\"M PLUS 2\", sans-serif" },
    { label: "IBM Plex Sans JP", value: "\"IBM Plex Sans JP\", sans-serif" },
    { label: "Sawarabi Gothic", value: "\"Sawarabi Gothic\", sans-serif" },
    { label: "Kosugi", value: "\"Kosugi\", sans-serif" },
    { label: "M PLUS Rounded 1c", value: "\"M PLUS Rounded 1c\", sans-serif" },
    { label: "Zen Maru Gothic", value: "\"Zen Maru Gothic\", sans-serif" },
    { label: "Kiwi Maru", value: "\"Kiwi Maru\", serif" },
    { label: "Kosugi Maru", value: "\"Kosugi Maru\", sans-serif" },
    { label: "Noto Serif JP", value: "\"Noto Serif JP\", serif" },
    { label: "Shippori Mincho", value: "\"Shippori Mincho\", serif" },
    { label: "Zen Old Mincho", value: "\"Zen Old Mincho\", serif" },
    { label: "Sawarabi Mincho", value: "\"Sawarabi Mincho\", serif" },
    { label: "Hina Mincho", value: "\"Hina Mincho\", serif" },
    { label: "BIZ UDMincho", value: "\"BIZ UDMincho\", serif" },
    { label: "BIZ UDPMincho", value: "\"BIZ UDPMincho\", serif" },
    { label: "Klee One", value: "\"Klee One\", cursive" },
    { label: "Yomogi", value: "\"Yomogi\", cursive" },
    { label: "Yuji Syuku", value: "\"Yuji Syuku\", serif" },
    { label: "Yuji Mai", value: "\"Yuji Mai\", serif" },
    { label: "Yuji Boku", value: "\"Yuji Boku\", serif" },
    { label: "DotGothic16", value: "\"DotGothic16\", sans-serif" },
    { label: "Dela Gothic One", value: "\"Dela Gothic One\", sans-serif" },
    { label: "Rampart One", value: "\"Rampart One\", sans-serif" },
    { label: "Reggae One", value: "\"Reggae One\", sans-serif" },
    { label: "Stick", value: "\"Stick\", sans-serif" }
  ];

  const $ = (selector) => document.querySelector(selector);

  const canvas = $("#previewCanvas");
  const ctx = canvas.getContext("2d", { alpha: true });

  const audioInput = $("#audioInput");
  const audioPlayer = $("#audioPlayer");
  const audioFileInfo = $("#audioFileInfo");
  const clearAudioBtn = $("#clearAudioBtn");
  const lyricsInput = $("#lyricsInput");
  const previewBgColorInput = $("#previewBgColorInput");
  const previewBgFitSelect = $("#previewBgFitSelect");
  const previewBgScaleInput = $("#previewBgScaleInput");
  const previewBgScaleOutput = $("#previewBgScaleOutput");
  const previewBgImageInput = $("#previewBgImageInput");
  const clearPreviewBgImageBtn = $("#clearPreviewBgImageBtn");

  const defaultFontFamilyInput = $("#defaultFontFamilyInput");
  const defaultFontSizeInput = $("#defaultFontSizeInput");
  const defaultDurationInput = $("#defaultDurationInput");
  const defaultAnimationInput = $("#defaultAnimationInput");
  const defaultAlignInput = $("#defaultAlignInput");
  const autoChainSelect = $("#autoChainSelect");
  const applyDefaultToSelectedBtn = $("#applyDefaultToSelectedBtn");

  const lyricsCountInfo = $("#lyricsCountInfo");
  const clearLyricsBtn = $("#clearLyricsBtn");
  const lyricsButtonList = $("#lyricsButtonList");
  const cueList = $("#cueList");

  const activeCueInfo = $("#activeCueInfo");
  const setPreviewFromAudioBtn = $("#setPreviewFromAudioBtn");
  const previewTimeInput = $("#previewTimeInput");
  const previewTimeRange = $("#previewTimeRange");
  const renderPreviewBtn = $("#renderPreviewBtn");

  const selectedEmptyMessage = $("#selectedEmptyMessage");
  const cueEditor = $("#cueEditor");
  const cueTextInput = $("#cueTextInput");
  const cueStartInput = $("#cueStartInput");
  const cueEndInput = $("#cueEndInput");
  const cueAnimationInput = $("#cueAnimationInput");
  const cueAlignInput = $("#cueAlignInput");
  const cueXInput = $("#cueXInput");
  const cueXOutput = $("#cueXOutput");
  const cueYInput = $("#cueYInput");
  const cueYOutput = $("#cueYOutput");
  const cueMaxWidthInput = $("#cueMaxWidthInput");
  const cueMaxWidthOutput = $("#cueMaxWidthOutput");
  const cueFontFamilyInput = $("#cueFontFamilyInput");
  const cueFontSizeInput = $("#cueFontSizeInput");
  const cueColorInput = $("#cueColorInput");
  const cueLineHeightInput = $("#cueLineHeightInput");
  const cueCpsInput = $("#cueCpsInput");
  const cueCpsOutput = $("#cueCpsOutput");
  const cueJumpSizeInput = $("#cueJumpSizeInput");
  const cueJumpSizeOutput = $("#cueJumpSizeOutput");
  const cueJumpSpeedInput = $("#cueJumpSpeedInput");
  const cueJumpSpeedOutput = $("#cueJumpSpeedOutput");
  const cueFadeInInput = $("#cueFadeInInput");
  const cueFadeOutInput = $("#cueFadeOutInput");
  const cueStrokeEnabledInput = $("#cueStrokeEnabledInput");
  const cueShadowEnabledInput = $("#cueShadowEnabledInput");
  const cueFadeInDurationInput = $("#cueFadeInDurationInput");
  const cueFadeOutDurationInput = $("#cueFadeOutDurationInput");
  const cueStrokeColorInput = $("#cueStrokeColorInput");
  const cueStrokeWidthInput = $("#cueStrokeWidthInput");
  const cueShadowColorInput = $("#cueShadowColorInput");
  const cueShadowBlurInput = $("#cueShadowBlurInput");
  const cueShadowOffsetXInput = $("#cueShadowOffsetXInput");
  const cueShadowOffsetYInput = $("#cueShadowOffsetYInput");
  const duplicateCueBtn = $("#duplicateCueBtn");
  const deleteCueBtn = $("#deleteCueBtn");

  const exportFpsInput = $("#exportFpsInput");
  const exportPrefixInput = $("#exportPrefixInput");
  const exportStartInput = $("#exportStartInput");
  const exportEndInput = $("#exportEndInput");
  const setExportEndFromAudioBtn = $("#setExportEndFromAudioBtn");
  const exportZipBtn = $("#exportZipBtn");
  const exportProgress = $("#exportProgress");

  const saveJsonBtn = $("#saveJsonBtn");
  const loadJsonInput = $("#loadJsonInput");
  const saveCacheBtn = $("#saveCacheBtn");
  const loadCacheBtn = $("#loadCacheBtn");

  const defaultStyle = () => ({
    x: 960,
    y: 540,
    maxWidth: 1580,
    align: "center",
    fontFamily: FONT_OPTIONS[1].value,
    fontSize: 86,
    lineHeight: 1.25,
    color: "#ffffff",
    animation: "typewriter",
    cps: 24,
    jumpSize: 28,
    jumpSpeed: 8,
    fadeIn: true,
    fadeOut: true,
    fadeInDuration: 0.3,
    fadeOutDuration: 0.35,
    stroke: {
      enabled: true,
      color: "#111827",
      width: 8
    },
    shadow: {
      enabled: true,
      color: "#000000",
      blur: 14,
      offsetX: 0,
      offsetY: 8
    }
  });

  const initialState = () => ({
    audioDataUrl: null,
    audioFileName: "",
    audioMimeType: "",
    previewBackgroundColor: "#f6fbff",
    previewBackgroundFit: "cover",
    previewBackgroundScale: 100,
    previewBackgroundImageDataUrl: null,
    previewBackgroundImage: null,
    lyrics: [],
    cues: [],
    selectedCueId: null,
    lastCreatedCueId: null,
    defaults: {
      fontFamily: FONT_OPTIONS[1].value,
      fontSize: 86,
      duration: 3,
      animation: "typewriter",
      align: "center",
      autoChain: true
    }
  });

  let state = initialState();
  let renderLoopRunning = false;
  let suppressEditorEvents = false;

  function uniqueId(prefix) {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return `${prefix}_${window.crypto.randomUUID()}`;
    }
    return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  }

  function clamp(value, min, max) {
    const n = Number(value);
    if (!Number.isFinite(n)) return min;
    return Math.min(max, Math.max(min, n));
  }

  function round(value, digits = 2) {
    const n = Number(value);
    if (!Number.isFinite(n)) return 0;
    const f = 10 ** digits;
    return Math.round(n * f) / f;
  }

  function formatTime(value) {
    const n = Math.max(0, Number(value) || 0);
    const minutes = Math.floor(n / 60);
    const seconds = n - minutes * 60;
    return `${String(minutes).padStart(2, "0")}:${seconds.toFixed(2).padStart(5, "0")}`;
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(reader.error || new Error("ファイルを読み込めませんでした"));
      reader.readAsDataURL(file);
    });
  }

  function fileToText(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(reader.error || new Error("テキストを読み込めませんでした"));
      reader.readAsText(file, "utf-8");
    });
  }

  function loadImage(dataUrl) {
    return new Promise((resolve, reject) => {
      if (!dataUrl) {
        resolve(null);
        return;
      }
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("画像を読み込めませんでした"));
      image.src = dataUrl;
    });
  }

  function populateFontSelect(select) {
    select.innerHTML = "";
    FONT_OPTIONS.forEach((font) => {
      const option = document.createElement("option");
      option.value = font.value;
      option.textContent = font.label;
      select.append(option);
    });
  }

  function createCueStyle(templateCue = null) {
    const base = defaultStyle();
    base.fontFamily = state.defaults.fontFamily || base.fontFamily;
    base.fontSize = clamp(state.defaults.fontSize, 10, 300);
    base.animation = state.defaults.animation || base.animation;
    base.align = state.defaults.align || base.align;

    if (!templateCue?.settings) return base;

    const template = clone(templateCue.settings);
    const next = { ...base, ...template };
    next.stroke = { ...base.stroke, ...(template.stroke || {}) };
    next.shadow = { ...base.shadow, ...(template.shadow || {}) };
    return next;
  }

  function getCueTemplateSource() {
    const selected = selectedCue();
    if (selected?.settings) return selected;

    if (state.lastCreatedCueId) {
      const lastCreated = getCueById(state.lastCreatedCueId);
      if (lastCreated?.settings) return lastCreated;
    }

    return state.cues
      .slice()
      .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0) || b.start - a.start)[0] || null;
  }

  function selectedCue() {
    return state.cues.find((cue) => cue.id === state.selectedCueId) || null;
  }

  function getCueById(id) {
    return state.cues.find((cue) => cue.id === id) || null;
  }

  function getLyricByCueId(cueId) {
    return state.lyrics.find((lyric) => lyric.cueId === cueId) || null;
  }

  function sortCues() {
    state.cues.sort((a, b) => a.start - b.start || a.end - b.end);
  }

  function syncDefaultControls() {
    defaultFontFamilyInput.value = state.defaults.fontFamily;
    defaultFontSizeInput.value = String(state.defaults.fontSize);
    defaultDurationInput.value = String(state.defaults.duration);
    defaultAnimationInput.value = state.defaults.animation;
    defaultAlignInput.value = state.defaults.align;
    autoChainSelect.value = state.defaults.autoChain ? "1" : "0";
  }

  function syncPreviewBackgroundControls() {
    previewBgColorInput.value = state.previewBackgroundColor || "#f6fbff";
    previewBgFitSelect.value = state.previewBackgroundFit || "cover";
    previewBgScaleInput.value = String(clamp(state.previewBackgroundScale ?? 100, 10, 300));
    previewBgScaleOutput.textContent = `${previewBgScaleInput.value}%`;
  }

  function updateDefaultStateFromControls() {
    state.defaults.fontFamily = defaultFontFamilyInput.value;
    state.defaults.fontSize = Math.round(clamp(defaultFontSizeInput.value, 10, 300));
    state.defaults.duration = round(clamp(defaultDurationInput.value, 0.1, 60), 2);
    state.defaults.animation = defaultAnimationInput.value;
    state.defaults.align = defaultAlignInput.value;
    state.defaults.autoChain = autoChainSelect.value === "1";
    syncDefaultControls();
  }

  function parseLyricsText(text) {
    return text
      .replace(/^\uFEFF/, "")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line, index) => ({
        id: uniqueId("lyric"),
        index,
        text: line,
        cueId: null
      }));
  }

  function assignLyricAtCurrentTime(lyric) {
    const currentTime = Number.isFinite(audioPlayer.currentTime) ? audioPlayer.currentTime : Number(previewTimeInput.value) || 0;
    const start = round(Math.max(0, currentTime), 2);
    const duration = round(clamp(state.defaults.duration, 0.1, 60), 2);
    const templateCue = getCueTemplateSource();
    const cue = {
      id: uniqueId("cue"),
      lyricId: lyric.id,
      text: lyric.text,
      start,
      end: round(start + duration, 2),
      createdAt: Date.now(),
      settings: createCueStyle(templateCue)
    };

    if (state.defaults.autoChain) {
      const previous = state.cues
        .filter((item) => item.start < start)
        .sort((a, b) => b.start - a.start)[0];
      if (previous && previous.end > start) {
        previous.end = round(Math.max(previous.start + 0.05, start), 2);
      }
    }

    lyric.cueId = cue.id;
    state.cues.push(cue);
    sortCues();
    state.selectedCueId = cue.id;
    state.lastCreatedCueId = cue.id;
    updatePreviewTime(start, true);
    renderAll();
  }

  function unassignLyric(lyric) {
    if (!lyric.cueId) return;
    const removingId = lyric.cueId;
    state.cues = state.cues.filter((cue) => cue.id !== removingId);
    lyric.cueId = null;
    if (state.selectedCueId === removingId) {
      state.selectedCueId = state.cues[0]?.id || null;
    }
    if (state.lastCreatedCueId === removingId) {
      state.lastCreatedCueId = state.cues
        .slice()
        .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0) || b.start - a.start)[0]?.id || null;
    }
    renderAll();
  }

  function renderLyricButtons() {
    lyricsButtonList.innerHTML = "";
    lyricsCountInfo.textContent = state.lyrics.length ? `${state.lyrics.length}行` : "歌詞未読込";

    if (!state.lyrics.length) {
      const empty = document.createElement("div");
      empty.className = "empty-message";
      empty.textContent = "歌詞TXTを読み込むと、ここに1行ずつボタンが追加されます。";
      lyricsButtonList.append(empty);
      return;
    }

    state.lyrics.forEach((lyric, index) => {
      const cue = lyric.cueId ? getCueById(lyric.cueId) : null;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "lyric-button";
      if (cue) button.classList.add("used");
      if (cue && cue.id === state.selectedCueId) button.classList.add("selected");
      button.innerHTML = `
        <span class="lyric-number">${String(index + 1).padStart(3, "0")}</span>
        <span class="lyric-text"></span>
        <span class="lyric-status">${cue ? `入力済み ${formatTime(cue.start)} / 再クリックでキャンセル` : "クリックで現在時刻に入力"}</span>
      `;
      button.querySelector(".lyric-text").textContent = lyric.text;
      button.addEventListener("click", () => {
        if (lyric.cueId) {
          unassignLyric(lyric);
        } else {
          assignLyricAtCurrentTime(lyric);
        }
      });
      lyricsButtonList.append(button);
    });
  }

  function renderCueList() {
    cueList.innerHTML = "";
    if (!state.cues.length) {
      const empty = document.createElement("div");
      empty.className = "empty-message";
      empty.textContent = "入力済みフレーズはまだありません。音声再生中に歌詞ボタンを押してください。";
      cueList.append(empty);
      return;
    }

    sortCues();
    state.cues.forEach((cue, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "cue-item";
      if (cue.id === state.selectedCueId) button.classList.add("selected");
      button.innerHTML = `
        <span class="cue-time">${String(index + 1).padStart(3, "0")} / ${formatTime(cue.start)} - ${formatTime(cue.end)}</span>
        <span class="cue-text"></span>
      `;
      button.querySelector(".cue-text").textContent = cue.text;
      button.addEventListener("click", () => {
        state.selectedCueId = cue.id;
        updatePreviewTime(cue.start, true);
        renderAll();
      });
      cueList.append(button);
    });
  }

  function syncCueEditor() {
    const cue = selectedCue();
    suppressEditorEvents = true;

    if (!cue) {
      selectedEmptyMessage.classList.remove("hidden");
      cueEditor.classList.add("hidden");
      suppressEditorEvents = false;
      return;
    }

    selectedEmptyMessage.classList.add("hidden");
    cueEditor.classList.remove("hidden");

    const s = cue.settings || createCueStyle();
    cue.settings = s;

    cueTextInput.value = cue.text || "";
    cueStartInput.value = String(round(cue.start, 2));
    cueEndInput.value = String(round(cue.end, 2));
    cueAnimationInput.value = s.animation || "normal";
    cueAlignInput.value = s.align || "center";
    cueXInput.value = String(clamp(s.x, 0, CANVAS_WIDTH));
    cueYInput.value = String(clamp(s.y, 0, CANVAS_HEIGHT));
    cueMaxWidthInput.value = String(clamp(s.maxWidth, 100, CANVAS_WIDTH));
    cueFontFamilyInput.value = s.fontFamily || FONT_OPTIONS[1].value;
    cueFontSizeInput.value = String(clamp(s.fontSize, 10, 300));
    cueColorInput.value = s.color || "#ffffff";
    cueLineHeightInput.value = String(clamp(s.lineHeight, 0.5, 3));
    cueCpsInput.value = String(clamp(s.cps, 1, 120));
    cueJumpSizeInput.value = String(clamp(s.jumpSize, 0, 160));
    cueJumpSpeedInput.value = String(clamp(s.jumpSpeed, 1, 20));
    cueFadeInInput.checked = Boolean(s.fadeIn);
    cueFadeOutInput.checked = Boolean(s.fadeOut);
    cueFadeInDurationInput.value = String(clamp(s.fadeInDuration, 0.01, 5));
    cueFadeOutDurationInput.value = String(clamp(s.fadeOutDuration, 0.01, 5));
    cueStrokeEnabledInput.checked = Boolean(s.stroke?.enabled);
    cueStrokeColorInput.value = s.stroke?.color || "#111827";
    cueStrokeWidthInput.value = String(clamp(s.stroke?.width ?? 0, 0, 80));
    cueShadowEnabledInput.checked = Boolean(s.shadow?.enabled);
    cueShadowColorInput.value = s.shadow?.color || "#000000";
    cueShadowBlurInput.value = String(clamp(s.shadow?.blur ?? 0, 0, 120));
    cueShadowOffsetXInput.value = String(clamp(s.shadow?.offsetX ?? 0, -120, 120));
    cueShadowOffsetYInput.value = String(clamp(s.shadow?.offsetY ?? 0, -120, 120));

    updateRangeOutputs();
    suppressEditorEvents = false;
  }

  function updateRangeOutputs() {
    cueXOutput.textContent = `${cueXInput.value}px`;
    cueYOutput.textContent = `${cueYInput.value}px`;
    cueMaxWidthOutput.textContent = `${cueMaxWidthInput.value}px`;
    cueCpsOutput.textContent = `${cueCpsInput.value} cps`;
    cueJumpSizeOutput.textContent = `${cueJumpSizeInput.value}px`;
    cueJumpSpeedOutput.textContent = `${cueJumpSpeedInput.value}`;
  }

  function updateCueFromEditor() {
    if (suppressEditorEvents) return;
    const cue = selectedCue();
    if (!cue) return;

    cue.text = cueTextInput.value;
    cue.start = round(clamp(cueStartInput.value, 0, 99999), 2);
    cue.end = round(clamp(cueEndInput.value, cue.start + 0.05, 99999), 2);

    const s = cue.settings || createCueStyle();
    s.animation = cueAnimationInput.value;
    s.align = cueAlignInput.value;
    s.x = Math.round(clamp(cueXInput.value, 0, CANVAS_WIDTH));
    s.y = Math.round(clamp(cueYInput.value, 0, CANVAS_HEIGHT));
    s.maxWidth = Math.round(clamp(cueMaxWidthInput.value, 100, CANVAS_WIDTH));
    s.fontFamily = cueFontFamilyInput.value;
    s.fontSize = Math.round(clamp(cueFontSizeInput.value, 10, 300));
    s.color = cueColorInput.value;
    s.lineHeight = round(clamp(cueLineHeightInput.value, 0.5, 3), 2);
    s.cps = Math.round(clamp(cueCpsInput.value, 1, 120));
    s.jumpSize = Math.round(clamp(cueJumpSizeInput.value, 0, 160));
    s.jumpSpeed = round(clamp(cueJumpSpeedInput.value, 1, 20), 1);
    s.fadeIn = cueFadeInInput.checked;
    s.fadeOut = cueFadeOutInput.checked;
    s.fadeInDuration = round(clamp(cueFadeInDurationInput.value, 0.01, 5), 2);
    s.fadeOutDuration = round(clamp(cueFadeOutDurationInput.value, 0.01, 5), 2);
    s.stroke = {
      enabled: cueStrokeEnabledInput.checked,
      color: cueStrokeColorInput.value,
      width: Math.round(clamp(cueStrokeWidthInput.value, 0, 80))
    };
    s.shadow = {
      enabled: cueShadowEnabledInput.checked,
      color: cueShadowColorInput.value,
      blur: Math.round(clamp(cueShadowBlurInput.value, 0, 120)),
      offsetX: Math.round(clamp(cueShadowOffsetXInput.value, -120, 120)),
      offsetY: Math.round(clamp(cueShadowOffsetYInput.value, -120, 120))
    };
    cue.settings = s;

    const linkedLyric = state.lyrics.find((lyric) => lyric.id === cue.lyricId);
    if (linkedLyric) linkedLyric.text = cue.text;

    sortCues();
    updateRangeOutputs();
    renderLyricButtons();
    renderCueList();
    renderCurrentPreview();
  }

  function applyDefaultsToSelected() {
    const cue = selectedCue();
    if (!cue) return;
    const old = cue.settings || createCueStyle();
    const next = createCueStyle();
    next.x = old.x;
    next.y = old.y;
    next.maxWidth = old.maxWidth;
    next.color = old.color;
    next.stroke = clone(old.stroke || next.stroke);
    next.shadow = clone(old.shadow || next.shadow);
    cue.settings = next;
    syncCueEditor();
    renderCurrentPreview();
  }

  function duplicateSelectedCue() {
    const cue = selectedCue();
    if (!cue) return;
    const duplicated = clone(cue);
    duplicated.id = uniqueId("cue");
    duplicated.lyricId = null;
    duplicated.start = round(cue.start + 0.1, 2);
    duplicated.end = round(cue.end + 0.1, 2);
    state.cues.push(duplicated);
    sortCues();
    state.selectedCueId = duplicated.id;
    renderAll();
  }

  function deleteCue(cueId) {
    const id = cueId || state.selectedCueId;
    if (!id) return;
    state.cues = state.cues.filter((cue) => cue.id !== id);
    state.lyrics.forEach((lyric) => {
      if (lyric.cueId === id) lyric.cueId = null;
    });
    if (state.selectedCueId === id) {
      state.selectedCueId = state.cues[0]?.id || null;
    }
    if (state.lastCreatedCueId === id) {
      state.lastCreatedCueId = state.cues
        .slice()
        .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0) || b.start - a.start)[0]?.id || null;
    }
    renderAll();
  }

  function drawImageFit(context, image, fit, width, height, scalePercent = 100) {
    if (!image) return;
    const scale = clamp(scalePercent, 10, 300) / 100;
    if (fit === "stretch") {
      const drawWidth = width * scale;
      const drawHeight = height * scale;
      context.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
      return;
    }

    const imageRatio = image.width / image.height;
    const canvasRatio = width / height;
    let drawWidth;
    let drawHeight;

    if (fit === "contain") {
      if (imageRatio > canvasRatio) {
        drawWidth = width;
        drawHeight = width / imageRatio;
      } else {
        drawHeight = height;
        drawWidth = height * imageRatio;
      }
    } else {
      if (imageRatio > canvasRatio) {
        drawHeight = height;
        drawWidth = height * imageRatio;
      } else {
        drawWidth = width;
        drawHeight = width / imageRatio;
      }
    }

    drawWidth *= scale;
    drawHeight *= scale;
    context.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
  }

  function splitChars(text) {
    return Array.from(String(text || ""));
  }

  function visibleTextByCount(text, count) {
    const chars = splitChars(text);
    return chars.slice(0, Math.max(0, count)).join("");
  }

  function wrapTextLines(context, text, maxWidth) {
    const sourceLines = String(text || "").split(/\n/);
    const lines = [];

    sourceLines.forEach((sourceLine) => {
      const chars = splitChars(sourceLine);
      let line = "";

      chars.forEach((char) => {
        const testLine = line + char;
        if (line && context.measureText(testLine).width > maxWidth) {
          lines.push(line);
          line = char;
        } else {
          line = testLine;
        }
      });

      lines.push(line);
    });

    return lines.length ? lines : [""];
  }

  function getCueAlpha(cue, time) {
    const s = cue.settings;
    let alpha = 1;
    if (s.fadeIn) {
      alpha *= clamp((time - cue.start) / Math.max(0.01, s.fadeInDuration || 0.3), 0, 1);
    }
    if (s.fadeOut) {
      alpha *= clamp((cue.end - time) / Math.max(0.01, s.fadeOutDuration || 0.35), 0, 1);
    }
    return alpha;
  }

  function drawStyledText(context, text, x, y, settings) {
    if (!text) return;

    context.save();
    context.textAlign = "left";
    if (settings.shadow?.enabled) {
      context.shadowColor = settings.shadow.color || "#000000";
      context.shadowBlur = settings.shadow.blur || 0;
      context.shadowOffsetX = settings.shadow.offsetX || 0;
      context.shadowOffsetY = settings.shadow.offsetY || 0;
    } else {
      context.shadowColor = "transparent";
      context.shadowBlur = 0;
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
    }

    if (settings.stroke?.enabled && Number(settings.stroke.width) > 0) {
      context.lineJoin = "round";
      context.miterLimit = 2;
      context.strokeStyle = settings.stroke.color || "#111827";
      context.lineWidth = Number(settings.stroke.width) || 0;
      context.strokeText(text, x, y);
    }

    context.fillStyle = settings.color || "#ffffff";
    context.fillText(text, x, y);
    context.restore();
  }

  function drawCue(context, cue, time) {
    if (time < cue.start || time > cue.end) return;
    const settings = cue.settings || createCueStyle();
    const alpha = getCueAlpha(cue, time);
    if (alpha <= 0) return;

    const elapsed = Math.max(0, time - cue.start);
    const allText = String(cue.text || "");
    let text = allText;
    if (settings.animation === "typewriter" || settings.animation === "jumpTypewriter") {
      const visibleCount = Math.floor(elapsed * Math.max(1, settings.cps || 24));
      text = visibleTextByCount(allText, visibleCount);
    }

    context.save();
    context.globalAlpha *= alpha;
    context.font = `700 ${Math.max(1, settings.fontSize || 86)}px ${settings.fontFamily || FONT_OPTIONS[1].value}`;
    context.textBaseline = "alphabetic";

    const maxWidth = Math.max(100, settings.maxWidth || 1580);
    const lines = wrapTextLines(context, text, maxWidth);
    const lineHeight = Math.max(1, (settings.fontSize || 86) * (settings.lineHeight || 1.25));
    const totalHeight = lineHeight * Math.max(1, lines.length);
    const startY = (settings.y || 540) - totalHeight / 2 + lineHeight * 0.85;

    let globalCharIndex = 0;
    lines.forEach((line, lineIndex) => {
      const y = startY + lineIndex * lineHeight;
      const lineWidth = context.measureText(line).width;
      let x = settings.x || 960;
      if (settings.align === "center") x -= lineWidth / 2;
      if (settings.align === "right") x -= lineWidth;

      if (settings.animation === "jumpTypewriter") {
        let cursorX = x;
        splitChars(line).forEach((char) => {
          const charWidth = context.measureText(char).width;
          const wave = Math.abs(Math.sin(elapsed * (settings.jumpSpeed || 8) + globalCharIndex * 0.65));
          const jumpY = y - wave * (settings.jumpSize || 0);
          drawStyledText(context, char, cursorX, jumpY, settings);
          cursorX += charWidth;
          globalCharIndex += 1;
        });
      } else {
        drawStyledText(context, line, x, y, settings);
      }
    });

    context.restore();
  }

  function renderFrame(time, options = {}) {
    const includePreviewBackground = options.includePreviewBackground !== false;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    if (includePreviewBackground) {
      ctx.save();
      ctx.fillStyle = state.previewBackgroundColor || "#f6fbff";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      if (state.previewBackgroundImage) {
        drawImageFit(
          ctx,
          state.previewBackgroundImage,
          state.previewBackgroundFit || "cover",
          CANVAS_WIDTH,
          CANVAS_HEIGHT,
          state.previewBackgroundScale ?? 100
        );
      }
      ctx.restore();
    }

    const active = state.cues
      .filter((cue) => time >= cue.start && time <= cue.end)
      .sort((a, b) => a.start - b.start);
    active.forEach((cue) => drawCue(ctx, cue, time));

    if (includePreviewBackground) {
      if (active.length) {
        activeCueInfo.textContent = active.map((cue) => cue.text).join(" / ");
      } else {
        activeCueInfo.textContent = "表示中の歌詞なし";
      }
    }
  }

  function renderCurrentPreview() {
    renderFrame(Number(previewTimeInput.value) || 0, { includePreviewBackground: true });
  }

  function renderAll() {
    renderLyricButtons();
    renderCueList();
    syncCueEditor();
    renderCurrentPreview();
  }

  function updatePreviewTime(value, render = true) {
    const max = Number(previewTimeRange.max) || Math.max(30, value);
    const time = round(clamp(value, 0, max), 2);
    previewTimeInput.value = String(time);
    previewTimeRange.value = String(time);
    if (render) renderFrame(time, { includePreviewBackground: true });
  }

  function updatePreviewRangeMax() {
    const duration = Number.isFinite(audioPlayer.duration) ? audioPlayer.duration : 0;
    const cueEnd = Math.max(0, ...state.cues.map((cue) => cue.end || 0));
    const max = Math.max(30, Math.ceil(duration || cueEnd || 30));
    previewTimeRange.max = String(max);
    if (duration && Number(exportEndInput.value) <= 3) {
      exportEndInput.value = String(round(duration, 2));
    }
  }

  function startRenderLoop() {
    if (renderLoopRunning) return;
    renderLoopRunning = true;

    const tick = () => {
      updatePreviewTime(audioPlayer.currentTime || 0, false);
      renderFrame(audioPlayer.currentTime || 0, { includePreviewBackground: true });
      if (!audioPlayer.paused && !audioPlayer.ended) {
        requestAnimationFrame(tick);
      } else {
        renderLoopRunning = false;
      }
    };

    requestAnimationFrame(tick);
  }

  async function hydrateAssets() {
    if (state.previewBackgroundImageDataUrl) {
      try {
        state.previewBackgroundImage = await loadImage(state.previewBackgroundImageDataUrl);
      } catch (_) {
        state.previewBackgroundImage = null;
      }
    } else {
      state.previewBackgroundImage = null;
    }

    if (state.audioDataUrl) {
      audioPlayer.src = state.audioDataUrl;
      audioFileInfo.textContent = state.audioFileName ? `読込済み: ${state.audioFileName}` : "音声読込済み";
    } else {
      audioPlayer.removeAttribute("src");
      audioPlayer.load();
      audioFileInfo.textContent = "音声未読込";
    }
  }

  function serializeProject() {
    const data = clone(state);
    delete data.previewBackgroundImage;
    return data;
  }

  async function loadProject(project) {
    const next = initialState();
    state = {
      ...next,
      ...project,
      previewBackgroundScale: clamp(project.previewBackgroundScale ?? next.previewBackgroundScale, 10, 300),
      defaults: { ...next.defaults, ...(project.defaults || {}) },
      lyrics: Array.isArray(project.lyrics) ? project.lyrics : [],
      cues: Array.isArray(project.cues) ? project.cues : []
    };

    state.cues = state.cues.map((cue) => ({
      id: cue.id || uniqueId("cue"),
      lyricId: cue.lyricId || null,
      text: cue.text || "",
      start: Number(cue.start) || 0,
      end: Number(cue.end) || (Number(cue.start) || 0) + 3,
      createdAt: Number(cue.createdAt) || 0,
      settings: {
        ...defaultStyle(),
        ...(cue.settings || {}),
        stroke: { ...defaultStyle().stroke, ...(cue.settings?.stroke || {}) },
        shadow: { ...defaultStyle().shadow, ...(cue.settings?.shadow || {}) }
      }
    }));

    state.lyrics = state.lyrics.map((lyric, index) => ({
      id: lyric.id || uniqueId("lyric"),
      index,
      text: lyric.text || "",
      cueId: lyric.cueId || null
    }));

    if (state.selectedCueId && !state.cues.some((cue) => cue.id === state.selectedCueId)) {
      state.selectedCueId = state.cues[0]?.id || null;
    }

    if (state.lastCreatedCueId && !state.cues.some((cue) => cue.id === state.lastCreatedCueId)) {
      state.lastCreatedCueId = state.cues
        .slice()
        .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0) || b.start - a.start)[0]?.id || null;
    }

    sortCues();
    await hydrateAssets();
    syncPreviewBackgroundControls();
    syncDefaultControls();
    updatePreviewRangeMax();
    renderAll();
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function downloadJson() {
    const json = JSON.stringify(serializeProject(), null, 2);
    const blob = new Blob([json], { type: "application/json" });
    downloadBlob(blob, "mv-lyrics-project.json");
  }

  function openCacheDb() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(CACHE_DB_NAME, 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(CACHE_STORE_NAME)) {
          db.createObjectStore(CACHE_STORE_NAME);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error("IndexedDBを開けませんでした"));
    });
  }

  async function saveCache() {
    const db = await openCacheDb();
    await new Promise((resolve, reject) => {
      const transaction = db.transaction(CACHE_STORE_NAME, "readwrite");
      transaction.objectStore(CACHE_STORE_NAME).put(serializeProject(), CACHE_KEY);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error || new Error("キャッシュ保存に失敗しました"));
    });
    db.close();
  }

  async function loadCache() {
    const db = await openCacheDb();
    const project = await new Promise((resolve, reject) => {
      const transaction = db.transaction(CACHE_STORE_NAME, "readonly");
      const request = transaction.objectStore(CACHE_STORE_NAME).get(CACHE_KEY);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error || new Error("キャッシュ復元に失敗しました"));
    });
    db.close();
    if (project) {
      await loadProject(project);
    } else {
      alert("保存済みキャッシュがありません。");
    }
  }

  async function exportTransparentPngZip() {
    if (!window.JSZip) {
      alert("JSZipを読み込めませんでした。インターネット接続、またはCDNの読み込みを確認してください。");
      return;
    }

    const fps = Math.round(clamp(exportFpsInput.value, 1, 60));
    const start = round(clamp(exportStartInput.value, 0, 99999), 2);
    const end = round(clamp(exportEndInput.value, start + 0.01, 99999), 2);
    const prefix = (exportPrefixInput.value || "lyrics").replace(/[\\/:*?"<>|]/g, "_");
    const frameCount = Math.floor((end - start) * fps) + 1;

    exportZipBtn.disabled = true;
    exportProgress.textContent = `書き出し準備中... 0 / ${frameCount}`;

    try {
      const zip = new JSZip();
      for (let i = 0; i < frameCount; i += 1) {
        const time = start + i / fps;
        renderFrame(time, { includePreviewBackground: false });
        const base64 = canvas.toDataURL("image/png").split(",")[1];
        zip.file(`${prefix}_${String(i).padStart(5, "0")}.png`, base64, { base64: true });

        if (i % 5 === 0 || i === frameCount - 1) {
          exportProgress.textContent = `PNG生成中... ${i + 1} / ${frameCount}`;
          await new Promise((resolve) => setTimeout(resolve, 0));
        }
      }

      const blob = await zip.generateAsync({ type: "blob" }, (metadata) => {
        exportProgress.textContent = `ZIP生成中... ${Math.round(metadata.percent)}%`;
      });
      downloadBlob(blob, `${prefix}_png_sequence.zip`);
      exportProgress.textContent = `完了: ${frameCount}枚を書き出しました。`;
    } catch (error) {
      console.error(error);
      exportProgress.textContent = "書き出しに失敗しました。";
      alert(error?.message || "書き出しに失敗しました。枚数を減らして再試行してください。");
    } finally {
      exportZipBtn.disabled = false;
      renderCurrentPreview();
    }
  }

  function bindEvents() {
    audioInput.addEventListener("change", async () => {
      const file = audioInput.files?.[0];
      if (!file) return;
      state.audioDataUrl = await fileToDataUrl(file);
      state.audioFileName = file.name;
      state.audioMimeType = file.type;
      await hydrateAssets();
      audioPlayer.addEventListener("loadedmetadata", updatePreviewRangeMax, { once: true });
    });

    clearAudioBtn.addEventListener("click", async () => {
      state.audioDataUrl = null;
      state.audioFileName = "";
      state.audioMimeType = "";
      audioInput.value = "";
      await hydrateAssets();
      renderCurrentPreview();
    });

    lyricsInput.addEventListener("change", async () => {
      const file = lyricsInput.files?.[0];
      if (!file) return;
      const text = await fileToText(file);
      state.lyrics = parseLyricsText(text);
      state.cues = [];
      state.selectedCueId = null;
      state.lastCreatedCueId = null;
      renderAll();
    });

    clearLyricsBtn.addEventListener("click", () => {
      state.lyrics = [];
      state.cues = [];
      state.selectedCueId = null;
      state.lastCreatedCueId = null;
      lyricsInput.value = "";
      renderAll();
    });

    previewBgColorInput.addEventListener("input", () => {
      state.previewBackgroundColor = previewBgColorInput.value;
      renderCurrentPreview();
    });

    previewBgFitSelect.addEventListener("change", () => {
      state.previewBackgroundFit = previewBgFitSelect.value;
      renderCurrentPreview();
    });

    previewBgScaleInput.addEventListener("input", () => {
      state.previewBackgroundScale = Math.round(clamp(previewBgScaleInput.value, 10, 300));
      previewBgScaleOutput.textContent = `${state.previewBackgroundScale}%`;
      renderCurrentPreview();
    });

    previewBgImageInput.addEventListener("change", async () => {
      const file = previewBgImageInput.files?.[0];
      if (!file) return;
      state.previewBackgroundImageDataUrl = await fileToDataUrl(file);
      state.previewBackgroundImage = await loadImage(state.previewBackgroundImageDataUrl);
      renderCurrentPreview();
    });

    clearPreviewBgImageBtn.addEventListener("click", () => {
      state.previewBackgroundImageDataUrl = null;
      state.previewBackgroundImage = null;
      previewBgImageInput.value = "";
      renderCurrentPreview();
    });

    [defaultFontFamilyInput, defaultFontSizeInput, defaultDurationInput, defaultAnimationInput, defaultAlignInput, autoChainSelect]
      .forEach((input) => input.addEventListener("input", updateDefaultStateFromControls));

    applyDefaultToSelectedBtn.addEventListener("click", applyDefaultsToSelected);

    audioPlayer.addEventListener("loadedmetadata", updatePreviewRangeMax);
    audioPlayer.addEventListener("play", startRenderLoop);
    audioPlayer.addEventListener("pause", () => updatePreviewTime(audioPlayer.currentTime || 0, true));
    audioPlayer.addEventListener("seeked", () => updatePreviewTime(audioPlayer.currentTime || 0, true));

    setPreviewFromAudioBtn.addEventListener("click", () => {
      updatePreviewTime(audioPlayer.currentTime || 0, true);
    });

    previewTimeRange.addEventListener("input", () => updatePreviewTime(previewTimeRange.value, true));
    previewTimeInput.addEventListener("input", () => updatePreviewTime(previewTimeInput.value, true));
    renderPreviewBtn.addEventListener("click", renderCurrentPreview);

    const editorInputs = [
      cueTextInput,
      cueStartInput,
      cueEndInput,
      cueAnimationInput,
      cueAlignInput,
      cueXInput,
      cueYInput,
      cueMaxWidthInput,
      cueFontFamilyInput,
      cueFontSizeInput,
      cueColorInput,
      cueLineHeightInput,
      cueCpsInput,
      cueJumpSizeInput,
      cueJumpSpeedInput,
      cueFadeInInput,
      cueFadeOutInput,
      cueStrokeEnabledInput,
      cueShadowEnabledInput,
      cueFadeInDurationInput,
      cueFadeOutDurationInput,
      cueStrokeColorInput,
      cueStrokeWidthInput,
      cueShadowColorInput,
      cueShadowBlurInput,
      cueShadowOffsetXInput,
      cueShadowOffsetYInput
    ];
    editorInputs.forEach((input) => input.addEventListener("input", updateCueFromEditor));
    editorInputs.forEach((input) => input.addEventListener("change", updateCueFromEditor));

    duplicateCueBtn.addEventListener("click", duplicateSelectedCue);
    deleteCueBtn.addEventListener("click", () => deleteCue());

    setExportEndFromAudioBtn.addEventListener("click", () => {
      if (Number.isFinite(audioPlayer.duration) && audioPlayer.duration > 0) {
        exportEndInput.value = String(round(audioPlayer.duration, 2));
      }
    });
    exportZipBtn.addEventListener("click", exportTransparentPngZip);

    saveJsonBtn.addEventListener("click", downloadJson);
    loadJsonInput.addEventListener("change", async () => {
      const file = loadJsonInput.files?.[0];
      if (!file) return;
      try {
        const text = await fileToText(file);
        await loadProject(JSON.parse(text));
      } catch (error) {
        console.error(error);
        alert("JSONを読み込めませんでした。");
      } finally {
        loadJsonInput.value = "";
      }
    });

    saveCacheBtn.addEventListener("click", async () => {
      try {
        await saveCache();
        alert("キャッシュへ保存しました。");
      } catch (error) {
        console.error(error);
        alert("キャッシュ保存に失敗しました。ブラウザの保存容量を確認してください。");
      }
    });

    loadCacheBtn.addEventListener("click", async () => {
      try {
        await loadCache();
      } catch (error) {
        console.error(error);
        alert("キャッシュ復元に失敗しました。");
      }
    });
  }

  function init() {
    populateFontSelect(defaultFontFamilyInput);
    populateFontSelect(cueFontFamilyInput);
    syncDefaultControls();
    syncPreviewBackgroundControls();
    bindEvents();
    renderAll();
  }

  init();
})();
