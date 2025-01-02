type typeLink = { label: string; href: string }

export interface ILinks {
  title: string
  links: [typeLink, typeLink, typeLink, typeLink]
}

export interface ISocialMedia {
  link: string
  icon: JSX.Element
}

export interface IPayment {
  name: string
  icon: JSX.Element
}
