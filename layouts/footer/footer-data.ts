import Facebook from 'assets/png/facebook.png';
import Instagram from 'assets/png/instagram.png';
import Vk from 'assets/png/vk.png';
import Youtube from 'assets/png/youtube.png';

const socialMediaLinks = [
  {
    image: Facebook,
    link: 'https://facebook.com',
  },
  {
    image: Instagram,
    link: 'https://www.instagram.com/tv/CfBzL-HOoEb/?igshid=YmMyMTA2M2Y=',
  },
  {
    image: Vk,
    link: 'https://t.me/Giper_Mart',
  },
  {
    image: Youtube,
    link: 'https://youtube.com',
  },
  
];

const useFullLinks = [
  {
    label: 'Условия обмена и возврата',
    link: '/information/refund',
  },
  {
    label: 'Каталог',
    link: '#',
  },
  {
    label: 'О компании',
    link: '/compInfo',
  },
  {
    label: 'Контакты',
    link: '#',
  },
  {
    label: 'Доставка',
    link: '/information/delivery',
  },
  {
    label: 'Оплата',
    link: '/information/payment',
  },
];

const aboutSite = [
  {
    label: 'Клиентам',
    link: '/information/clients',
  },
  {
    label: 'Личный кабинет',
    link: '/information/personal-account',
  },
  {
    label: 'Блог',
    link: '/information/blog',
  },
  {
    label: 'Обратная связь',
    link: '#',
  },
];

const siteInfo = [
  {
    label: 'Информация',
    link: '/information/information',
  },
  {
    label: 'Пользовательское соглашение',
    link: '/information/user-agreement',
  },
  {
    label: 'Политика конфиденциальности и оферта',
    link: '/information/offer',
  },
];

export { socialMediaLinks, aboutSite, siteInfo, useFullLinks };
