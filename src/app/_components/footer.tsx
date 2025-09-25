"use client";

import { CONTACT_CONFIG, QUICK_LINKS_CONFIG } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
      <div className="container mx-auto px-5 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 公司信息 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
              {CONTACT_CONFIG.company}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-2">
              {CONTACT_CONFIG.address}
            </p>
            <p className="text-neutral-600 dark:text-neutral-400">
              <span className="font-medium">{t('footer.workingHours')}：</span>
              {CONTACT_CONFIG.workingHours}
            </p>
          </div>

          {/* 联系方式 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
              {t('footer.contactUs')}
            </h3>
            <div className="space-y-2">
              <p className="text-neutral-600 dark:text-neutral-400">
                <span className="font-medium">{t('footer.phone')}：</span>
                <a 
                  href={`tel:${CONTACT_CONFIG.phone}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {CONTACT_CONFIG.phone}
                </a>
              </p>
              <p className="text-neutral-600 dark:text-neutral-400">
                <span className="font-medium">{t('footer.email')}：</span>
                <a 
                  href={`mailto:${CONTACT_CONFIG.email}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {CONTACT_CONFIG.email}
                </a>
              </p>
              <p className="text-neutral-600 dark:text-neutral-400">
                <span className="font-medium">{t('footer.wechat')}：</span>
                {CONTACT_CONFIG.wechat}
              </p>
              <p className="text-neutral-600 dark:text-neutral-400">
                <span className="font-medium">{t('footer.whatsapp')}：</span>
                {CONTACT_CONFIG.whatsapp}
              </p>
            </div>
          </div>

          {/* 快速链接 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
              {t('footer.quickLinks')}
            </h3>
            <div className="space-y-2">
              <a
                href={QUICK_LINKS_CONFIG.home}
                className="block text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                {t('footer.home')}
              </a>
              <a
                href={QUICK_LINKS_CONFIG.products}
                className="block text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                {t('footer.products')}
              </a>
              <a
                href={QUICK_LINKS_CONFIG.about}
                className="block text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                {t('footer.about')}
              </a>
            </div>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="border-t border-neutral-200 dark:border-neutral-800 mt-8 pt-8 text-center">
          <p className="text-neutral-500 dark:text-neutral-500 text-sm">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}