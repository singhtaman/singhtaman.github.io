/*
	Light/dark toggle for redesign.css. Loaded in <head> (not deferred) so a
	saved choice is applied before the page paints. Without a saved choice the
	site follows the system setting.
*/
(function () {
	var root = document.documentElement;
	var systemDark = window.matchMedia('(prefers-color-scheme: dark)');
	var saved = null;

	try { saved = localStorage.getItem('theme'); } catch (e) {}
	if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);

	function isDark() {
		var theme = root.getAttribute('data-theme');
		return theme ? theme === 'dark' : systemDark.matches;
	}

	document.addEventListener('DOMContentLoaded', function () {
		var button = document.querySelector('.theme-toggle');
		if (!button) return;

		function sync() {
			button.setAttribute('aria-pressed', String(isDark()));
		}

		button.hidden = false;
		sync();

		button.addEventListener('click', function () {
			var next = isDark() ? 'light' : 'dark';
			root.setAttribute('data-theme', next);
			try { localStorage.setItem('theme', next); } catch (e) {}
			sync();
		});

		if (systemDark.addEventListener) systemDark.addEventListener('change', sync);
	});
})();
