export interface TextFormatting {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  link?: string;
}

export interface BillSection {
  id: string;
  number: number;
  title: string;
  content: string;
  formatting?: TextFormatting;
}

export interface Bill {
  congress: number;
  session: number;
  billNumber: string;
  title: string;
  billPurpose: string;
  sponsor: string;
  cosponsors: string;
  introduction: string;
  headerAct: string;
  headerMonth: string;
  headerDay: string;
  headerYear: string;
  sections: BillSection[];
}
