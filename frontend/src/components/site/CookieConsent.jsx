
import { useEffect, useState } from "react";

const STORAGE_KEY = "sofi_analytics_consent";

export function CookieConsent() {
  const [consent, setConsent] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  });

  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const openSettings = () => setSettingsOpen(true);

    window.addEventListener(
      "open-analytics-settings",
      openSettings
    );

    return () => {
      window.removeEventListener(
        "open-analytics-settings",
        openSettings
      );
    };
  }, []);

  useEffect(() => {
    if (consent === "accepted") {
      window.startYandexMetrika?.();
    }
  }, [consent]);

  const saveChoice = (choice) => {
    const wasAccepted =
      consent === "accepted" ||
      window.yandexMetrikaStarted === true;

    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Если хранилище недоступно,
      // выбор действует в текущей вкладке.
    }

    setConsent(choice);
    setSettingsOpen(false);

    if (choice === "rejected" && wasAccepted) {
      window.location.reload();
    }
  };

  const showBanner = consent === null || settingsOpen;

  return (
    <>
      {showBanner && (
        <section
          role="dialog"
          aria-label="Настройки аналитики"
          className="fixed bottom-4 left-4 right-4 z-[100] mx-auto max-w-xl rounded-2xl border border-white/20 bg-[#14171C] p-5 text-white shadow-2xl sm:bottom-6 sm:p-6"
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="text-xl text-[#C6FF36]">
              ✦
            </span>

            <h2 className="text-lg font-semibold">
              Ваша конфиденциальность
            </h2>
          </div>

          <p className="mb-5 text-sm leading-relaxed text-gray-300">
            Мы используем Яндекс Метрику, чтобы
            понимать, как посетители пользуются
            сайтом, и делать его удобнее.
            Вы можете разрешить аналитику
            или отказаться от неё.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => saveChoice("accepted")}
              className="rounded-xl bg-[#C6FF36] px-5 py-3 text-sm font-bold text-black transition hover:opacity-90"
            >
              Принять
            </button>

            <button
              type="button"
              onClick={() => saveChoice("rejected")}
              className="rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Отклонить
            </button>
          </div>
        </section>
      )}
    </>
  );
}
