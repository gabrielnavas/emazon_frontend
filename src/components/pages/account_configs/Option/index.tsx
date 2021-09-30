import Link from 'next/link'
import { ReactNode } from 'react'

import {
  Container,
  IconContainer,
  Infos,
  Title,
  Description
} from './styles'

type Props = {
  title: string
  description: string
  href: string
  icon: ReactNode
}

const Option = (props: Props) => {
  return (
    <Link href={props.href}>
      <Container>
        <IconContainer>
          {props.icon}
        </IconContainer>
        <Infos>
        <Title>{props.title}</Title>
        <Description>{props.description}</Description>
        </Infos>
      </Container>
    </Link>
  )
}

export default Option
