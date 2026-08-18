import { Optional } from "sequelize";

export interface CoverLetterRecipient {
  company: string;
  hiringManager?: string;
  address?: string;
}

export interface CoverLetterLetter {
  date: string;
  subject?: string;
  salutation: string;
  bodyParagraphs: string[];
  closing: string;
}

export interface CoverLetterData {
  personal: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    image?: string;
    summary: string;
  };
  recipient: CoverLetterRecipient;
  letter: CoverLetterLetter;
}

export interface CoverLetterAttributes {
  Id: number;
  userId: number;
  Title: string;
  TemplateId: string;
  Data: CoverLetterData;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CoverLetterCreationAttributes extends Optional<
  CoverLetterAttributes,
  "Id" | "createdAt" | "updatedAt"
> {}

export type CoverLetter = CoverLetterAttributes;
