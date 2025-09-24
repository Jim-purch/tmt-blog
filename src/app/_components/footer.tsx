import { CONTACT_CONFIG } from "@/lib/constants";

export function Footer() {
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
              {CONTACT_CONFIG.workingHours}
            </p>
          </div>

          {/* 联系方式 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
              联系我们
            </h3>
            <div className="space-y-2">
              <p className="text-neutral-600 dark:text-neutral-400">
                <span className="font-medium">电话：</span>
                <a 
                  href={`tel:${CONTACT_CONFIG.phone}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {CONTACT_CONFIG.phone}
                </a>
              </p>
              <p className="text-neutral-600 dark:text-neutral-400">
                <span className="font-medium">邮箱：</span>
                <a 
                  href={`mailto:${CONTACT_CONFIG.email}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {CONTACT_CONFIG.email}
                </a>
              </p>
              <p className="text-neutral-600 dark:text-neutral-400">
                <span className="font-medium">Whatsapp：</span>
                {CONTACT_CONFIG.Whatsapp}
              </p>
              <p className="text-neutral-600 dark:text-neutral-400">
                <span className="font-medium">Wechat：</span>
                {CONTACT_CONFIG.Wechat}
              </p>
            </div>
          </div>

          {/* 快速链接 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
              快速链接
            </h3>
            <div className="space-y-2">
              <a 
                href="/"
                className="block text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                首页
              </a>
              <a 
                href="https://www.toomotoo.com/"
                className="block text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                关于我们
              </a>
            </div>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="border-t border-neutral-200 dark:border-neutral-800 mt-8 pt-8 text-center">
          <p className="text-neutral-500 dark:text-neutral-500 text-sm">
            {CONTACT_CONFIG.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}