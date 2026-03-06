/**
 * Bozorcha Configuration Module
 * Маркази ягонаи танзимоти платформа (Seller + Buyer)
 */

const CONFIG = {
    // --- ПАЙВАСТШАВӢ БА СЕРВЕР ---
    SUPABASE_URL: "https://seagtlaujnnhoyitgsdd.supabase.co",
    SUPABASE_ANON_KEY: "sb_publishable_OlLChtOja0i8nIrPZuM_Og_vyfGjfsP",
    
    // --- МАЪЛУМОТИ БАРНОМА ---
    APP_NAME: "Bozorcha",
    APP_VERSION: "1.0.0",
    SUPPORT_CONTACT: "@bozorcha_support", // Telegram user ё Email

    // --- ТАРИФҲОИ ФУРӮШАНДАГОН (SELLER PLANS) ---
    PLAN_TYPES: {
        FREE: {
            id: 'free',
            name: 'Оғоз',
            priceMonth: 0,
            priceYear: 0,
            maxProducts: 20,
            commission: 7, // 7%
            statsDays: 1,  // Омори танҳо 1 рӯза
            adsEnabled: false
        },
        BASIC: {
            id: 'basic',
            name: 'Тиҷорат',
            priceMonth: 39,
            priceYear: 379,
            maxProducts: 50,
            commission: 4, // 4%
            statsDays: 60, // Омори 2 моҳа
            adsEnabled: ['basic', 'pro']
        },
        PRO: {
            id: 'pro',
            name: 'Пешсаф',
            priceMonth: 99,
            priceYear: 969,
            maxProducts: 100,
            commission: 3, // 3%
            statsDays: 180, // Омори 6 моҳа
            adsEnabled: ['basic', 'pro', 'ultra'],
            bonusAds: { type: 'basic', days: 4 } // 4 рӯз Basic бепул
        },
        CORP: {
            id: 'corp',
            name: 'Корпорат',
            priceMonth: 349,
            priceYear: 3439,
            maxProducts: Infinity, // Бемаҳдуд
            commission: 2, // 2%
            statsDays: -1, // Тамоми таърих + AI Insights
            adsEnabled: ['basic', 'pro', 'ultra'],
            freeAds: ['basic'] // Basic ҳамеша ройгон
        }
    },

    // --- СИСТЕМАИ РЕКЛАМА (ADVERTISING SYSTEM) ---
    AD_RATES: {
        BASIC: {
            price: 2.9,
            label: "Рекламаи Оқилона",
            description: "Маҳсул ҳангоми ҷустуҷӯ боло мебарояд"
        },
        PRO: {
            price: 4.9,
            label: "Top-of-Feed",
            description: "Маҳсул барои бештари мардум намоён мешавад"
        },
        ULTRA: {
            price: 19,
            label: "Мағозаи Опыт",
            description: "Маҳсул дар аввал + Огоҳинома ба харидорон"
        }
    },

    // --- ТАНЗИМОТИ ВАҚТ ВА МАҲДУДИЯТҲО ---
    LIMITS: {
        MAX_AD_DAYS: 7,          // Максимум 7 рӯз реклама дар як харид
        MIN_WITHDRAWAL: 50,      // Ҳадди ақали гирифтани пул (сом)
        ESCROW_DAYS: 3           // Кафолати нигоҳдории пул (3 рӯз)
    },

    // --- ТАНЗИМОТИ БОЗИҲО (GAMIFICATION) ---
    GAME_SETTINGS: {
        COIN_NAME: "Bozorcha Coin",
        XP_PER_SALE: 10,         // Барои ҳар фурӯш ба фурӯшанда XP дода мешавад
        LEVEL_UP_BASE: 100       // Барои гузаштан ба Level 2
    }
};

// Экспорт барои мутобиқат бо системаи модулҳо ва телефон
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    window.CONFIG = CONFIG;
}

console.log("✅ Bozorcha Config: Симҳои танзимот бо муваффақият пайваст шуданд.");
