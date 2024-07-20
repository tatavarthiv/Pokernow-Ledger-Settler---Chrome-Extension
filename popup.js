document.addEventListener('DOMContentLoaded', () => {
    // Load saved preferences
    const stats = [
      'vpip', 'pfr', 'af', 'wtsd', 'wsd', 'three_bet', 'fold_to_three_bet',
      'cbet', 'fold_to_cbet', 'four_bet', 'fold_to_four_bet', 'steal',
      'fold_to_steal', 'check_raise', 'donk_bet', 'river_call_efficiency',
      'bb_per_100'
    ];
  
    chrome.storage.sync.get(stats, (data) => {
      stats.forEach(stat => {
        document.getElementById(stat).checked = data[stat] || false;
      });
    });
  
    document.getElementById('save').addEventListener('click', () => {
      const newSettings = {};
      stats.forEach(stat => {
        newSettings[stat] = document.getElementById(stat).checked;
      });
  
      // Save preferences
      chrome.storage.sync.set(newSettings, () => {
        alert('Preferences saved');
      });
    });
  });