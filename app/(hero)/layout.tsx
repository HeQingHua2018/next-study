import Header from "@/components/header";

const HeroLayout:React.FC<{children: React.ReactNode}>=({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) =>{
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default HeroLayout;
