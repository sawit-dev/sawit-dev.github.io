import type { MetaFunction } from "react-router"
import { ContactHeader } from "../components/contact/header"
import { ContactOptions } from "../components/contact/contact-options"

export const meta: MetaFunction = () => [
  { title: "Contact | Sawit Dev" },
  { name: "description", content: "Public ways to connect with Sawit Dev." },
]

export default function Contact() {
  return (
    <>
      <ContactHeader />
      <ContactOptions />
    </>
  )
}
