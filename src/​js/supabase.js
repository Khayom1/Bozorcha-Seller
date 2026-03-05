// Пайвастшавӣ ба Supabase - як маротиба
const SUPABASE_URL = 'https://seagtlaujnnhoyitgsdd.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_OlLChtOja0i8nIrPZuM_Og_vyfGjfsP';

export const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Функсияи гирифтани корбари воқеӣ
export async function getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
        window.location.href = '/public/index.html';
        return null;
    }
    return user;
}

// Функсияи назорати сессия
export function onAuthStateChange(callback) {
    supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_OUT') {
            window.location.href = '/public/index.html';
        }
        callback(event, session);
    });
}
