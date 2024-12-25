export interface InfographicData {
  title: string;
  points: string[];
}

export interface InfographicProps {
  data: InfographicData;
  onDownload: (variantId: string) => void;
}