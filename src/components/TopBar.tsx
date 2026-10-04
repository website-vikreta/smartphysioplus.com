import { clinic } from "@/content/clinic";
import { formatHours, whatsappLink } from "@/lib/format";
import { BrandLogo, Icon } from "./Icon";

// Thin contact strip above the header (desktop only). Phone and WhatsApp stay in the mobile action bar.
export function TopBar() {
  const a = clinic.address;
  const item = "inline-flex items-center gap-2";
  return (
    <div className="hidden bg-sp-blue-900 text-sm text-sp-white md:block">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-2">
        <p className={item}>
          <Icon name="pin" className="size-4 text-sp-teal-100" />
          {a.street}, {a.locality}, {a.city}
        </p>
        <ul className="flex items-center gap-6">
          <li className={item}>
            <Icon name="clock" className="size-4 text-sp-teal-100" />
            {formatHours()}
          </li>
          <li>
            <a href={clinic.phone.tel} className={`${item} hover:underline`}>
              <Icon name="phone" className="size-4 text-sp-teal-100" />
              {clinic.phone.display}
            </a>
          </li>
          <li>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className={`${item} hover:underline`}
            >
              <BrandLogo name="whatsapp" className="size-4" />
              WhatsApp
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
