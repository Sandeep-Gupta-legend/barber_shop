import { Helmet } from 'react-helmet-async';

export default function Seo({ title, description }) {
  const fullTitle = `${title} | Crown & Blade Barber Shop`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
}
