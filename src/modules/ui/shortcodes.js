import React from "react"
import Header from "@layouts/header"
import Links from "@ui/links"
import Link from "@modules/utility/Link"
import Skills from "@ui/skills"
import Location from "@ui/location"
import { Image, Text } from "theme-ui"
import gameIcon from "@public/icon-game.svg"
import businessIcon from "@public/icon-business.svg"
import userIcon from "@public/icon-user.svg"
import webIcon from "@public/icon-world.svg"
import Button from "@ui/Button"

export default {
  h1: props => <Text as="h1" className="title" {...props} />,
  h2: props => <Text as="h2" className="subtitle" {...props} />,
  h3: props => <Text as="h3" className="subtext" {...props} />,
  img: props => <Image {...props} className="image" />,
  a: props => <Link {...props} />,
  Header,
  Games: props => (
    <Links {...props} icon={gameIcon} className="games" alt="Games" />
  ),
  Business: props => (
    <Links
      {...props}
      icon={businessIcon}
      className="business"
      alt="Business Websites"
    />
  ),
  Personal: props => (
    <Links
      {...props}
      icon={userIcon}
      className="personal"
      alt="Personal Websites"
    />
  ),
  Website: props => (
    <Links {...props} icon={webIcon} className="website" alt="Websites" />
  ),
  Skills,
  Location,
  Button,
}
