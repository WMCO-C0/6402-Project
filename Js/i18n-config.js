/**
 * i18n Configuration and Initialization
 * Integrates jQuery.i18n and Universal Language Selector (ULS)
 */

(function() {
    'use strict';

    // Language configuration - Top 25 Wikipedia languages by readership
    const SUPPORTED_LANGUAGES = {
        'en': 'English',
        'es': 'Español',
        'ru': 'Русский',
        'de': 'Deutsch',
        'fr': 'Français',
        'ja': '日本語',
        'it': 'Italiano',
        'pt': 'Português',
        'zh': '中文',
        'pl': 'Polski',
        'fa': 'فارسی',
        'ar': 'العربية',
        'nl': 'Nederlands',
        'id': 'Bahasa Indonesia',
        'tr': 'Türkçe',
        'uk': 'Українська',
        'sv': 'Svenska',
        'cs': 'Čeština',
        'vi': 'Tiếng Việt',
        'ko': '한국어',
        'fi': 'Suomi',
        'hu': 'Magyar',
        'he': 'עברית',
        'no': 'Norsk',
        'ro': 'Română'
    };

    const DEFAULT_LANGUAGE = 'es';
    const I18N_PATH = '/i18n';

    /**
     * Initialize jQuery.i18n
     */
    function initI18n() {
        // Build the load object dynamically for all supported languages
        const loadObj = {};
        Object.keys(SUPPORTED_LANGUAGES).forEach(lang => {
            loadObj[lang] = I18N_PATH + '/' + lang + '.json';
        });
        
        return $.i18n({
            locale: getStoredLanguage() || DEFAULT_LANGUAGE
        }).load(loadObj);
    }

    /**
     * Get stored language from localStorage
     */
    function getStoredLanguage() {
        try {
            return localStorage.getItem('selectedLanguage');
        } catch (e) {
            console.warn('localStorage not available:', e);
            return null;
        }
    }

    /**
     * Store language in localStorage
     */
    function setStoredLanguage(lang) {
        try {
            localStorage.setItem('selectedLanguage', lang);
        } catch (e) {
            console.warn('localStorage not available:', e);
        }
    }

    /**
     * Update page language
     */
    function updateLanguage(lang) {
        if (!SUPPORTED_LANGUAGES[lang]) {
            console.error('Unsupported language:', lang);
            return;
        }

        // Set locale
        $.i18n().locale = lang;
        
        // Store selection
        setStoredLanguage(lang);

        // Update HTML lang attribute
        document.documentElement.lang = lang;

        // Refresh all i18n text
        refreshI18nText();

        // Update the language selector button text to show current language
        updateCurrentLanguageDisplay();

        // Trigger custom event
        $(document).trigger('languageChanged', [lang]);
    }

    /**
     * Refresh all i18n text elements
     */
    function refreshI18nText() {
        // Update elements with data-i18n attribute
        $('[data-i18n]').each(function() {
            const $elem = $(this);
            const key = $elem.attr('data-i18n');
            const text = $.i18n(key);
            
            // Check if element has data-i18n-html attribute
            if ($elem.attr('data-i18n-html') !== undefined) {
                $elem.html(text);
            } else {
                $elem.text(text);
            }
        });

        // Update elements with data-i18n-placeholder attribute
        $('[data-i18n-placeholder]').each(function() {
            const $elem = $(this);
            const key = $elem.attr('data-i18n-placeholder');
            $elem.attr('placeholder', $.i18n(key));
        });

        // Update elements with data-i18n-title attribute
        $('[data-i18n-title]').each(function() {
            const $elem = $(this);
            const key = $elem.attr('data-i18n-title');
            $elem.attr('title', $.i18n(key));
        });
    }

    /**
     * Initialize Universal Language Selector (ULS)
     */
    function initULS() {
        // Create language selector button if it doesn't exist
        if ($('#language-selector').length === 0) {
            // Check if we're in the root or EN directory
            const isInEN = window.location.pathname.includes('/EN/');
            const imgPath = isInEN ? '../Img/logoW.png' : 'Img/logoW.png';
            
            // Add language selector to navigation
            const $languageSelector = $('<div>')
                .attr('id', 'language-selector')
                .addClass('language-selector')
                .html('<button class="btn btn-sm btn-outline-light" id="language-btn" title="' + 
                      $.i18n('language-selector-label') + '">' +
                      '<i class="bi bi-translate"></i> ' + 
                      '<span id="current-language">' + SUPPORTED_LANGUAGES[$.i18n().locale] + '</span>' +
                      '</button>');
            
            // Insert after the logo in the navbar
            $('.navbar .container-fluid').append($languageSelector);
        }

        // Configure ULS on the language button
        $('#language-btn').uls({
            onSelect: function(language) {
                updateLanguage(language);
            },
            languages: SUPPORTED_LANGUAGES,
            quickList: ['es', 'en', 'pt', 'fr', 'de', 'ru', 'ja', 'zh', 'ar']
        });
    }

    /**
     * Initialize i18n system
     */
    function init() {
        // Wait for jQuery to be ready
        $(document).ready(function() {
            // Initialize i18n
            initI18n().done(function() {
                console.log('i18n initialized successfully');
                
                // Apply initial translations
                refreshI18nText();

                // Try to initialize ULS (may not be available in all contexts)
                try {
                    if (typeof $.fn.uls === 'function') {
                        initULS();
                    } else {
                        console.warn('ULS not available, creating fallback language selector');
                        createFallbackSelector();
                    }
                } catch (e) {
                    console.warn('Error initializing ULS:', e);
                    createFallbackSelector();
                }

                // Update current language display
                updateCurrentLanguageDisplay();
            }).fail(function(error) {
                console.error('Failed to initialize i18n:', error);
            });
        });
    }

    /**
     * Create fallback language selector when ULS is not available
     */
    function createFallbackSelector() {
        if ($('#language-selector').length === 0) {
            const currentLang = $.i18n().locale;
            
            const $languageSelector = $('<div>')
                .attr('id', 'language-selector')
                .addClass('language-selector dropdown')
                .html(
                    '<button class="btn btn-sm btn-outline-light dropdown-toggle" type="button" ' +
                    'id="languageDropdown" data-bs-toggle="dropdown" aria-expanded="false" ' +
                    'title="' + $.i18n('language-selector-label') + '">' +
                    '<i class="bi bi-translate"></i> ' + 
                    '<span id="current-language">' + SUPPORTED_LANGUAGES[currentLang] + '</span>' +
                    '</button>' +
                    '<ul class="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">' +
                    Object.keys(SUPPORTED_LANGUAGES).map(lang => 
                        '<li><a class="dropdown-item' + (lang === currentLang ? ' active' : '') + 
                        '" href="#" data-lang="' + lang + '">' + 
                        SUPPORTED_LANGUAGES[lang] + '</a></li>'
                    ).join('') +
                    '</ul>'
                );
            
            $('.navbar .container-fluid').append($languageSelector);

            // Add click handler for language selection
            $('.dropdown-item[data-lang]').on('click', function(e) {
                e.preventDefault();
                const lang = $(this).data('lang');
                updateLanguage(lang);
                updateCurrentLanguageDisplay();
            });
        }
    }

    /**
     * Update current language display
     */
    function updateCurrentLanguageDisplay() {
        const currentLang = $.i18n().locale;
        $('#current-language').text(SUPPORTED_LANGUAGES[currentLang]);
        $('.dropdown-item[data-lang]').removeClass('active');
        $('.dropdown-item[data-lang="' + currentLang + '"]').addClass('active');
    }

    /**
     * Public API
     */
    window.i18nConfig = {
        init: init,
        updateLanguage: updateLanguage,
        getCurrentLanguage: function() {
            return $.i18n().locale;
        },
        getSupportedLanguages: function() {
            return SUPPORTED_LANGUAGES;
        },
        translate: function(key) {
            return $.i18n(key);
        }
    };

    // Auto-initialize if jQuery is already loaded
    if (typeof jQuery !== 'undefined') {
        init();
    }
})();
