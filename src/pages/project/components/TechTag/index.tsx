interface Props {
  name: string;
  textColor: string;
  backgroundColor: string;
}

export default function TechTag({ name, textColor, backgroundColor }: Props) {
  return (
    <div
      className="rounded-md px-2 py-1 text-sm font-bold"
      style={{
        color: textColor,
        backgroundColor,
      }}
    >
      {name}
    </div>
  );
}
