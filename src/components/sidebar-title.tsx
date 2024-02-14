type TitleComponentInput = {
  title: string;
  type: "separator" | "default";
};

export const TitleComponent = ({ title, type }: TitleComponentInput) => {
  if (title === "Coming from Otto 3") {
    return <>❓ {title}</>;
  }
  return <>{title}</>;
};
