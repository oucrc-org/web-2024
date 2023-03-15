import Image from 'next/image';
import Link from 'next/link';
import DoubleLineButton from './DoubleLineButton';

export default function Contact() {
  return (
    <div className="z-10 flex min-h-screen flex-col items-center gap-8 bg-white md:flex-row">
      <div className="z-10 flex flex-col gap-y-8 bg-white px-6 py-8 shadow-2xl">
        <h2 className="text-3xl font-bold tracking-wider text-secondary">
          お問い合わせ
        </h2>
        <hr className="w-full border border-solid border-divider" />
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="inline h-6"
            src="/images/landing/contact-mail.svg"
            alt="Mail"
          />
          <a
            href="mailto:oucrc.master@gmail.com"
            className="ml-4 font-semibold tracking-widest text-secondary"
          >
            oucrc.master@gmail.com
          </a>
        </div>
        <div className="">
          <Image
            width={24}
            height={24}
            className="inline h-6"
            src="/images/landing/contact-twitter.svg"
            alt="Twitter"
          />
          <a
            href="https://twitter.com/oucrc?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
            className="ml-4 font-semibold tracking-widest text-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            @oucrc
          </a>
        </div>
        <div className="">
          <Image
            width={24}
            height={24}
            className="inline h-6"
            src="/images/landing/contact-google-form.svg"
            alt="GoogleForm"
          />
          <Link
            href="/contact"
            className="ml-4 font-semibold tracking-widest text-secondary"
          >
            お問い合わせはこちら
          </Link>
        </div>
        <hr className="w-full border border-solid border-divider" />
        <div className="flex flex-col items-start gap-y-6">
          <p className="font-bold tracking-widest text-secondary">
            {`岡山大学 サークル BOX棟（2F 209)`}
          </p>
          <p className="text-xs tracking-widest text-secondary">
            2階へ上がって右の奥にあります
          </p>
          <a
            href="https://www.google.com/maps/place/%E3%80%92700-0082+%E5%B2%A1%E5%B1%B1%E7%9C%8C%E5%B2%A1%E5%B1%B1%E5%B8%82%E5%8C%97%E5%8C%BA%E6%B4%A5%E5%B3%B6%E4%B8%AD%EF%BC%92%E4%B8%81%E7%9B%AE%EF%BC%91+%E6%A0%A1%E5%8F%8B%E4%BC%9A%E6%96%87%E5%8C%96%E7%B3%BB%E3%82%AF%E3%83%A9%E3%83%96%E6%A3%9F/@34.6853962,133.9248862,17.5z/data=!4m5!3m4!1s0x3554066d34a8412f:0x59f13aab8699ff49!8m2!3d34.6854759!4d133.9246382"
            className="inline-block text-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <DoubleLineButton label="Google Mapでみる" className="text-sm" />
          </a>
        </div>
      </div>
      <div className="grow overflow-hidden">
        <iframe
          className="h-[110vh] w-full"
          title="GoogleMap"
          style={{ pointerEvents: 'none' }}
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2319.864736986123!2d133.9248861920379!3d34.685396222423485!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3554066d34a8412f%3A0x59f13aab8699ff49!2z44CSNzAwLTAwODIg5bKh5bGx55yM5bKh5bGx5biC5YyX5Yy65rSl5bO25Lit77yS5LiB55uu77yRIOagoeWPi-S8muaWh-WMluezu-OCr-ODqeODluajnw!5e0!3m2!1sja!2sjp!4v1614782882747!5m2!1sja!2sjp"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
