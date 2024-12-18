import type { ILinks, IPayment, ISocialMedia } from '@/types/footer'

import { Twitter } from '@/components/svgs/Twitter'
import { Facebook } from '@/components/svgs/Facebook'
import { Instagram } from '@/components/svgs/Instagram'
import { Github } from '@/components/svgs/Github'

import { Visa } from '@/components/svgs/Visa'
import { Mastercard } from '@/components/svgs/Mastercard'
import { PayPal } from '@/components/svgs/PayPal'
import { ApplePay } from '@/components/svgs/ApplePay'
import { GooglePay } from '@/components/svgs/GooglePay'

const links: ILinks[] = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/' },
      { label: 'Features', href: '/' },
      { label: 'Works', href: '/' },
      { label: 'Career', href: '/' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Customer Support', href: '/' },
      { label: 'Delivery Details', href: '/' },
      { label: 'Terms & Conditions', href: '/' },
      { label: 'Privacy Policy', href: '/' },
    ],
  },
  {
    title: 'FAQ',
    links: [
      { label: 'Account', href: '/' },
      { label: 'Manage Deliveries', href: '/' },
      { label: 'Orders', href: '/' },
      { label: 'Payment', href: '/' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Free eBook', href: '/' },
      { label: 'Development Tutorial', href: '/' },
      { label: 'How to - Blog', href: '/' },
      { label: 'Youtube Playlist', href: '/' },
    ],
  },
]

const medias: ISocialMedia[] = [
  { link: 'https://github.com/hiagoemanuel/', icon: Twitter },
  { link: 'https://github.com/hiagoemanuel/', icon: Facebook },
  { link: 'https://github.com/hiagoemanuel/', icon: Instagram },
  { link: 'https://github.com/hiagoemanuel/', icon: Github },
]

const payments: IPayment[] = [
  { name: 'visa', icon: Visa },
  { name: 'mastercard', icon: Mastercard },
  { name: 'pay pal', icon: PayPal },
  { name: 'apple pay', icon: ApplePay },
  { name: 'google pay', icon: GooglePay },
]

export default { links, medias, payments }
