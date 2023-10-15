import { PlayerContactInfo } from "@/interfaces/Admin";
import React from "react";

type Props = {
  contactInfo: PlayerContactInfo;
  header: string;
};

function ContactInfo({ contactInfo, header }: Props) {
  return (
    <div>
      <h3 className="text-md font-bold">{header}</h3>
      <p>
        {contactInfo.firstname} {contactInfo.lastname}
      </p>
      <p>{contactInfo.group}</p>
      <p>{contactInfo.email}</p>
      <p>{contactInfo.phone}</p>
    </div>
  );
}

export default ContactInfo;
