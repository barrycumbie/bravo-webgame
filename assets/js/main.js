const shortcutPairs = [
  { id: 'refresh-page', shortcut: 'Ctrl + R', action: 'Refresh page' },
  { id: 'find-text', shortcut: 'Ctrl + F', action: 'Find text on the page' },
  { id: 'close-tab', shortcut: 'Ctrl + W', action: 'Close current tab' },
  { id: 'reopen-tab', shortcut: 'Ctrl + Shift + T', action: 'Reopen last closed tab' },
  { id: 'new-tab', shortcut: 'Ctrl + T', action: 'Open new tab' },
  { id: 'close-window', shortcut: 'Alt + F4', action: 'Close active window' },
  { id: 'copy', shortcut: 'Ctrl + C', action: 'Copy selected text' },
  { id: 'paste', shortcut: 'Ctrl + V', action: 'Paste copied text' },
  { id: 'cut', shortcut: 'Ctrl + X', action: 'Cut selected text' },
  { id: 'undo', shortcut: 'Ctrl + Z', action: 'Undo last action' },
  { id: 'paste-plain', shortcut: 'Ctrl + Shift + V', action: 'Paste without formatting' },
  { id: 'switch-windows', shortcut: 'Alt + Tab', action: 'Switch open windows' },
  { id: 'save', shortcut: 'Ctrl + S', action: 'Save current file' },
  { id: 'select-all', shortcut: 'Ctrl + A', action: 'Select all content' },
  { id: 'new-window', shortcut: 'Ctrl + N', action: 'Open new window' },
  { id: 'print', shortcut: 'Ctrl + P', action: 'Open print dialog' },
  { id: 'open-file', shortcut: 'Ctrl + O', action: 'Open a file' },
  { id: 'redo', shortcut: 'Ctrl + Y', action: 'Redo last action' },
];

const guestNames = ['Pixel', 'Nova', 'Orbit', 'Byte', 'Echo', 'Quill', 'Mango', 'Rift'];
const leaderboardKey = 'bravo-webgame-leaderboard';
const scoresKey = 'bravo-webgame-scores';
const nameKey = 'bravo-webgame-player';

const conceptState = {
  choiceSelected: false,
  answerSelected: false,
  score: 0,
};

const gameState = {
  deck: [],
  pendingDeck: [],
  activePairIds: [],
  started: false,
  locked: false,
  score: 0,
  lives: 3,
  matches: 0,
  combo: 1,
  correct: 0,
  mistakes: 0,
  streak: 0,
  level: 1,
  visiblePairs: 6,
  totalPairs: 6,
  selected: {
    shortcut: null,
    action: null,
  },
  modal: null,
};

const $ = window.jQuery || miniDollar;

$(() => {
  if (isConceptPage()) {
    initConcept();
    return;
  }

  if (isFullGamePage()) {
    initFullGame();
    return;
  }

  initDropDemo();
});

function miniDollar(selectorOrCallback) {
  if (typeof selectorOrCallback === 'function') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', selectorOrCallback);
      return;
    }

    selectorOrCallback();
    return;
  }

  const nodes = resolveNodes(selectorOrCallback);

  return createMiniCollection(nodes);
}

function resolveNodes(selectorOrCallback) {
  if (!selectorOrCallback) {
    return [];
  }

  if (selectorOrCallback instanceof MiniCollection) {
    return selectorOrCallback.nodes;
  }

  if (selectorOrCallback instanceof Element || selectorOrCallback === window || selectorOrCallback === document) {
    return [selectorOrCallback];
  }

  if (selectorOrCallback instanceof NodeList || Array.isArray(selectorOrCallback)) {
    return Array.from(selectorOrCallback);
  }

  if (typeof selectorOrCallback === 'string') {
    return Array.from(document.querySelectorAll(selectorOrCallback));
  }

  return [];
}

function createMiniCollection(nodes) {
  return new MiniCollection(nodes);
}

class MiniCollection {
  constructor(nodes) {
    this.nodes = nodes;
    this.length = nodes.length;

    for (let index = 0; index < nodes.length; index += 1) {
      this[index] = nodes[index];
    }
  }

  on(eventName, selectorOrHandler, handler) {
    if (typeof selectorOrHandler === 'function') {
      this.nodes.forEach(function (node) {
        node.addEventListener(eventName, selectorOrHandler);
      });
      return this;
    }

    this.nodes.forEach(function (node) {
      node.addEventListener(eventName, function (event) {
        const match = event.target.closest(selectorOrHandler);
        if (match && node.contains(match)) {
          handler.call(match, event);
        }
      });
    });
    return this;
  }

  addClass(className) {
    this.nodes.forEach(function (node) {
      node.classList.add(...className.split(' '));
    });
    return this;
  }

  removeClass(className) {
    this.nodes.forEach(function (node) {
      node.classList.remove(...className.split(' '));
    });
    return this;
  }

  toggleClass(className) {
    this.nodes.forEach(function (node) {
      node.classList.toggle(className);
    });
    return this;
  }

  hasClass(className) {
    return this.nodes[0] ? this.nodes[0].classList.contains(className) : false;
  }

  val(nextValue) {
    if (typeof nextValue === 'undefined') {
      return this.nodes[0] ? this.nodes[0].value : undefined;
    }

    this.nodes.forEach(function (node) {
      node.value = nextValue;
    });
    return this;
  }

  text(nextValue) {
    if (typeof nextValue === 'undefined') {
      return this.nodes[0] ? this.nodes[0].textContent : undefined;
    }

    this.nodes.forEach(function (node) {
      node.textContent = nextValue;
    });
    return this;
  }

  html(nextValue) {
    if (typeof nextValue === 'undefined') {
      return this.nodes[0] ? this.nodes[0].innerHTML : undefined;
    }

    this.nodes.forEach(function (node) {
      node.innerHTML = nextValue;
    });
    return this;
  }

  empty() {
    this.nodes.forEach(function (node) {
      node.innerHTML = '';
    });
    return this;
  }

  append(content) {
    this.nodes.forEach(function (node) {
      if (typeof content === 'string') {
        node.insertAdjacentHTML('beforeend', content);
        return;
      }

      if (content instanceof Element) {
        node.appendChild(content.cloneNode(true));
      }
    });
    return this;
  }

  attr(name, nextValue) {
    if (typeof nextValue === 'undefined') {
      return this.nodes[0] ? this.nodes[0].getAttribute(name) : undefined;
    }

    this.nodes.forEach(function (node) {
      node.setAttribute(name, nextValue);
    });
    return this;
  }

  prop(name, nextValue) {
    if (typeof nextValue === 'undefined') {
      return this.nodes[0] ? this.nodes[0][name] : undefined;
    }

    this.nodes.forEach(function (node) {
      node[name] = nextValue;
    });
    return this;
  }

  data(name) {
    return this.nodes[0] ? this.nodes[0].dataset[name.replace(/-([a-z])/g, function (_, letter) {
      return letter.toUpperCase();
    })] : undefined;
  }

  find(selector) {
    if (!this.nodes[0]) {
      return createMiniCollection([]);
    }

    return createMiniCollection(Array.from(this.nodes[0].querySelectorAll(selector)));
  }

  css(name, nextValue) {
    if (typeof nextValue === 'undefined') {
      return this.nodes[0] ? getComputedStyle(this.nodes[0])[name] : undefined;
    }

    this.nodes.forEach(function (node) {
      node.style[name] = nextValue;
    });
    return this;
  }

  not(selector) {
    return createMiniCollection(this.nodes.filter(function (node) {
      return !node.matches(selector);
    }));
  }

  first() {
    return createMiniCollection(this.nodes.slice(0, 1));
  }
}

function isFullGamePage() {
  return document.body.dataset.page === 'full' || $('#shortcutBoard').length > 0;
}

function isConceptPage() {
  return document.body.dataset.page === 'concept' || $('#choiceBtn').length > 0;
}

function initConcept() {
  const storedName = sessionStorage.getItem(nameKey) || '';

  $('#playerName').val(storedName);
  updateConceptGreeting(storedName);

  $('#playerName').on('input', function () {
    const enteredName = $(this).val();
    sessionStorage.setItem(nameKey, enteredName);
    updateConceptGreeting(enteredName);
  });

  $('#choiceBtn').on('click', function () {
    $(this).toggleClass('btn-success');
    conceptState.choiceSelected = true;
    maybeScoreConceptMatch();
  });

  $('#answerBtn').on('click', function () {
    $(this).toggleClass('btn-success');
    conceptState.answerSelected = true;
    maybeScoreConceptMatch();
  });

  updateConceptScore();
}

function maybeScoreConceptMatch() {
  if (!conceptState.choiceSelected || !conceptState.answerSelected) {
    return;
  }

  conceptState.score += 1;
  conceptState.choiceSelected = false;
  conceptState.answerSelected = false;
  $('#choiceBtn, #answerBtn').removeClass('btn-success');
  updateConceptScore();
}

function updateConceptGreeting(nameValue) {
  const cleanedName = sanitizeName(nameValue);
  const greetingName = cleanedName || 'player';
  $('#greetPlayer').text(`Hello ${greetingName}!`);
}

function updateConceptScore() {
  $('#gameScore').text(`Score: ${conceptState.score}`);
}

function initFullGame() {
  gameState.modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('gameModal'));

  const storedName = sanitizeName(sessionStorage.getItem(nameKey));
  if (storedName) {
    $('#playerName').val(storedName);
  }

  updatePlayerDetails();
  renderBoard(false);
  renderLeaderboard();
  bindFullGameEvents();
  updateStats();
  updateStatus('Press start to deal the cards.', 'info');
  $('#progressBar').css('width', '0%').text('0%');
}

function bindFullGameEvents() {
  $('#playerName').on('input', function () {
    sessionStorage.setItem(nameKey, $(this).val());
    updatePlayerDetails();
  });

  $('#startGameBtn').on('click', function () {
    startGame(true);
  });

  $('#resetGameBtn').on('click', function () {
    startGame(true);
  });

  $('#hintBtn').on('click', function () {
    showHint();
  });

  $('#modalPlayAgainBtn').on('click', function () {
    gameState.modal.hide();
    startGame(true);
  });

  $(document).on('click', '.shortcut-card', function () {
    handleCardClick($(this));
  });
}

function startGame(reshuffle) {
  const playerName = resolvePlayerName();
  gameState.level = 1;
  sessionStorage.setItem(nameKey, playerName);
  $('#playerName').val(playerName);

  gameState.started = true;
  gameState.locked = false;
  gameState.score = 0;
  gameState.lives = 3;
  gameState.matches = 0;
  gameState.combo = 1;
  gameState.correct = 0;
  gameState.mistakes = 0;
  gameState.streak = 0;
  gameState.totalPairs = gameState.level === 2 ? Math.min(18, shortcutPairs.length) : 6;
  gameState.visiblePairs = 6;
  clearSelection();

  buildDeck(reshuffle);
  renderBoard();
  updatePlayerDetails();
  updateStats();
  updateProgress();
  $('#modeLabel').text(gameState.level === 2 ? 'L2' : 'L1');
  updateStatus(`Good luck, ${playerName}. Match every shortcut pair.`, 'success');
}

function advanceToLevelTwo() {
  gameState.level = 2;
  gameState.matches = 0;
  gameState.totalPairs = Math.min(18, shortcutPairs.length);
  gameState.visiblePairs = 6;
  clearSelection();
  buildDeck(true);
  renderBoard();
  updateStats();
  updateProgress();
  $('#modeLabel').text('L2');
  updateStatus('Level 2 unlocked. Pairs now rotate in after each match.', 'success');
  updateSelectionText('Level 2 started. Keep matching to clear 18 pairs.');
}

function buildDeck(reshuffle) {
  const basePairs = reshuffle ? shuffleArray(shortcutPairs) : shortcutPairs.slice();
  const pairs = basePairs.slice(0, gameState.totalPairs);
  gameState.deck = pairs;
  gameState.pendingDeck = pairs.slice();
  gameState.activePairIds = [];
}

function renderBoard() {
  if (!gameState.started) {
    gameState.deck = [];
    gameState.pendingDeck = [];
    gameState.activePairIds = [];
  }

  while (gameState.activePairIds.length < gameState.visiblePairs && gameState.pendingDeck.length > 0) {
    gameState.activePairIds.push(gameState.pendingDeck.shift().id);
  }

  const activePairs = gameState.deck.filter(function (pair) {
    return gameState.activePairIds.includes(pair.id);
  });

  const shortcutCards = shuffleArray(activePairs.map(function (pair) {
    return createCardModel(pair, 'shortcut');
  }));
  const actionCards = shuffleArray(activePairs.map(function (pair) {
    return createCardModel(pair, 'action');
  }));

  $('#shortcutBoard').empty().append(shortcutCards.map(renderCard).join(''));
  $('#actionBoard').empty().append(actionCards.map(renderCard).join(''));

  if (!gameState.started) {
    $('#shortcutBoard, #actionBoard').addClass('hidden-board');
    $('.shortcut-card').prop('disabled', true);
    return;
  }

  $('#shortcutBoard, #actionBoard').removeClass('hidden-board');
  $('.shortcut-card').prop('disabled', false);
}

function createCardModel(pair, cardType) {
  return {
    pairId: pair.id,
    type: cardType,
    text: cardType === 'shortcut' ? pair.shortcut : pair.action,
    kicker: cardType === 'shortcut' ? 'Shortcut' : 'Action',
  };
}

function renderCard(cardModel) {
  return [
    '<button type="button" class="shortcut-card" data-pair-id="',
    cardModel.pairId,
    '" data-card-type="',
    cardModel.type,
    '" aria-pressed="false">',
    '<span class="card-kicker">',
    cardModel.kicker,
    '</span>',
    '<span class="card-text">',
    cardModel.text,
    '</span>',
    '</button>',
  ].join('');
}

function handleCardClick(card) {
  if (!gameState.started || gameState.locked || card.prop('disabled') || card.hasClass('is-matched')) {
    return;
  }

  const cardType = card.data('card-type');

  if (gameState.selected[cardType]) {
    gameState.selected[cardType].removeClass('is-selected').attr('aria-pressed', 'false');
  }

  gameState.selected[cardType] = card;
  card.addClass('is-selected').attr('aria-pressed', 'true');
  updateSelectionText();

  if (gameState.selected.shortcut && gameState.selected.action) {
    evaluateMatch();
  }
}

function evaluateMatch() {
  const shortcutCard = gameState.selected.shortcut;
  const actionCard = gameState.selected.action;

  if (!shortcutCard || !actionCard) {
    return;
  }

  const shortcutPairId = shortcutCard.data('pair-id');
  const actionPairId = actionCard.data('pair-id');

  if (shortcutPairId === actionPairId) {
    gameState.score += 10 * gameState.combo;
    gameState.correct += 1;
    gameState.matches += 1;
    gameState.combo += 1;
    gameState.streak += 1;

    shortcutCard.addClass('is-matched').removeClass('is-selected').prop('disabled', true).attr('aria-pressed', 'false');
    actionCard.addClass('is-matched').removeClass('is-selected').prop('disabled', true).attr('aria-pressed', 'false');

    clearSelection();
    updateStats();
    updateProgress();

    if (gameState.matches === gameState.totalPairs) {
      if (gameState.level === 1) {
        advanceToLevelTwo();
        return;
      }

      finishGame(true);
      return;
    }

    if (gameState.level === 2) {
      cycleMatchedPair(shortcutPairId, shortcutCard, actionCard);
      return;
    }

    updateStatus('Match locked in. Keep the streak going.', 'success');
    updateSelectionText('Last pair matched. Pick another.');
    return;
  }

  gameState.combo = 1;
  gameState.streak = 0;
  gameState.lives -= 1;
  gameState.mistakes += 1;
  gameState.locked = true;
  shortcutCard.addClass('is-mismatch');
  actionCard.addClass('is-mismatch');
  updateStats();
  updateSelectionText('That pair does not match.');
  updateStatus('Not a match. Try again.', 'danger');

  window.setTimeout(function () {
    shortcutCard.removeClass('is-selected is-mismatch').attr('aria-pressed', 'false');
    actionCard.removeClass('is-selected is-mismatch').attr('aria-pressed', 'false');
    clearSelection();
    gameState.locked = false;

    if (gameState.lives <= 0) {
      finishGame(false);
      return;
    }

    updateStatus('Pick a new pair.', 'info');
    updateSelectionText('Pick a shortcut tile, then pick an action tile.');
  }, 650);
}

function cycleMatchedPair(pairId, shortcutCard, actionCard) {
  gameState.locked = true;
  updateStatus('Nice match. Loading fresh options...', 'success');
  updateSelectionText('Matched pair cleared. New options incoming.');

  window.setTimeout(function () {
    shortcutCard.addClass('is-fading-out');
    actionCard.addClass('is-fading-out');
  }, 220);

  window.setTimeout(function () {
    gameState.activePairIds = gameState.activePairIds.filter(function (activePairId) {
      return activePairId !== pairId;
    });

    if (gameState.pendingDeck.length > 0) {
      gameState.activePairIds.push(gameState.pendingDeck.shift().id);
    }

    renderBoard();
    $('.shortcut-card').addClass('is-fading-in');
    gameState.locked = false;
    updateStatus('Match locked in. Keep the streak going.', 'success');
    updateSelectionText('Last pair matched. Pick another.');
  }, 450);
}

function clearSelection() {
  gameState.selected.shortcut = null;
  gameState.selected.action = null;
}

function finishGame(didWin) {
  gameState.started = false;
  gameState.locked = true;
  gameState.combo = 1;

  saveRun(didWin);
  renderLeaderboard();
  updateStats();
  updateProgress();

  const summaryText = didWin
    ? 'You cleared every shortcut pair.'
    : 'You ran out of lives before clearing the board.';

  $('#modalSummary').text(summaryText + ` Final score: ${gameState.score}.`);
  gameState.modal.show();

  updateStatus(summaryText, didWin ? 'success' : 'danger');
  updateSelectionText(summaryText);
}

function saveRun(didWin) {
  const run = {
    name: resolvePlayerName(),
    score: gameState.score,
    matches: gameState.matches,
    result: didWin ? 'win' : 'lose',
    playedAt: new Date().toISOString(),
  };

  const sessionRuns = readStorageList(scoresKey, 'session');
  sessionRuns.unshift(run);
  sessionStorage.setItem(scoresKey, JSON.stringify(sessionRuns.slice(0, 10)));

  const leaderboard = readStorageList(leaderboardKey, 'local');
  leaderboard.push(run);
  leaderboard.sort(function (left, right) {
    if (right.score === left.score) {
      return new Date(right.playedAt) - new Date(left.playedAt);
    }

    return right.score - left.score;
  });
  localStorage.setItem(leaderboardKey, JSON.stringify(leaderboard.slice(0, 10)));
}

function renderLeaderboard() {
  const leaderboard = readStorageList(leaderboardKey, 'local');

  if (!leaderboard.length) {
    $('#leaderboardList').html('<li class="list-group-item">No scores yet <span>---</span></li>');
    return;
  }

  $('#leaderboardList').html(leaderboard.slice(0, 5).map(function (item) {
    const playedAt = new Date(item.playedAt);
    const timeLabel = Number.isNaN(playedAt.getTime())
      ? 'recent'
      : playedAt.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

    return [
      '<li class="list-group-item">',
      '<span>',
      escapeHtml(item.name || 'Guest'),
      '</span>',
      '<span>',
      item.score,
      ' pts <small class="text-secondary d-block text-end">',
      timeLabel,
      '</small></span>',
      '</li>',
    ].join('');
  }).join(''));
}

function updateStats() {
  $('#gameScore').text(gameState.score);
  $('#correctCount').text(gameState.correct);
  $('#mistakeCount').text(gameState.mistakes);
  $('#streakCount').text(gameState.streak);
  $('#levelCount').text(gameState.level);
}

function updateProgress() {
  const totalPairs = gameState.totalPairs;
  const percent = totalPairs === 0 ? 0 : Math.round((gameState.matches / totalPairs) * 100);
  $('#progressBar').css('width', `${percent}%`).text(`${percent}%`);
}

function updateStatus(message, tone) {
  const status = $('#roundStatus');
  status.text(message);
  status.removeClass('text-bg-success text-bg-danger text-bg-info text-bg-light text-dark');

  if (tone === 'success') {
    status.addClass('text-bg-success');
    return;
  }

  if (tone === 'danger') {
    status.addClass('text-bg-danger');
    return;
  }

  status.addClass('text-bg-info');
}

function updateSelectionText(message) {
  if (message) {
    $('#selectionText').text(message);
    return;
  }

  const shortcutLabel = gameState.selected.shortcut ? gameState.selected.shortcut.find('.card-text').text() : 'none';
  const actionLabel = gameState.selected.action ? gameState.selected.action.find('.card-text').text() : 'none';
  $('#selectionText').text(`Shortcut: ${shortcutLabel} | Action: ${actionLabel}`);
}

function updatePlayerDetails() {
  const playerName = resolvePlayerName();
  const greeting = gameState.started ? 'Keep going' : 'Ready when you are';
  $('#greetPlayer').text(`Hello ${playerName}! ${greeting}.`);
}

function resolvePlayerName() {
  const storedName = sanitizeName($('#playerName').val() || sessionStorage.getItem(nameKey));
  if (storedName) {
    return storedName;
  }

  const guestName = guestNames[Math.floor(Math.random() * guestNames.length)];
  return `Guest ${guestName}`;
}

function sanitizeName(value) {
  return String(value || '').trim().replace(/\s+/g, ' ').slice(0, 24);
}

function showHint() {
  if (!gameState.started) {
    updateStatus('Start a round first, then use hints.', 'info');
    return;
  }

  const unmatchedPairs = gameState.deck.filter(function (pair) {
    return $('#shortcutBoard .shortcut-card[data-pair-id="' + pair.id + '"]').not('.is-matched').length > 0;
  });

  if (!unmatchedPairs.length) {
    updateStatus('Nothing left to hint. You are already done.', 'success');
    return;
  }

  const pair = unmatchedPairs[Math.floor(Math.random() * unmatchedPairs.length)];
  const shortcutCard = $('#shortcutBoard .shortcut-card[data-pair-id="' + pair.id + '"]');
  const actionCard = $('#actionBoard .shortcut-card[data-pair-id="' + pair.id + '"]');
  shortcutCard.addClass('ui-state-highlight');
  actionCard.addClass('ui-state-highlight');

  window.setTimeout(function () {
    shortcutCard.removeClass('ui-state-highlight');
    actionCard.removeClass('ui-state-highlight');
  }, 1100);

  updateStatus('Hint flashed a matching pair.', 'success');
}

function initDropDemo() {
  if (!$('#gamePiece').length || !$('#winGame').length) {
    return;
  }

  $('#gamePiece').draggable();
  $('#winGame').droppable({
    drop: function () {
      $(this).addClass('ui-state-highlight').find('p').html('Dropped!');
    },
  });
}

function shuffleArray(items) {
  const copy = items.slice();
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const temp = copy[index];
    copy[index] = copy[swapIndex];
    copy[swapIndex] = temp;
  }
  return copy;
}

function readStorageList(storageKey, storageType) {
  try {
    const rawValue = storageType === 'session'
      ? sessionStorage.getItem(storageKey)
      : localStorage.getItem(storageKey);
    return rawValue ? JSON.parse(rawValue) : [];
  } catch (error) {
    return [];
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}