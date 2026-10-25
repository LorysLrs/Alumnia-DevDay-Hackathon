// Logo Alumnia : « Alumnia » en écriture ronde (Bricolage Grotesque 800) dans un cartouche vert arrondi, avec une paillette jaune au coin. Fichiers dans public/brand/.

/* eslint-disable @next/next/no-img-element */
export function Logo({ height = 34, dark = false }: { height?: number; dark?: boolean }) {
  return (
    <img
      src={dark ? "/brand/alumnia-logo-fond-sombre.svg" : "/brand/alumnia-logo.svg"}
      alt="Alumnia"
      height={height}
      style={{ height, width: "auto", display: "block" }}
    />
  );
}

export function LogoSymbol({ size = 38 }: { size?: number }) {
  return <img src="/brand/alumnia-symbole.svg" alt="Alumnia" width={size} height={size} />;
}
