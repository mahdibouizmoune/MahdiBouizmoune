export function WorkImage({
  name,
  alt,
  eager = false,
}: {
  name: string;
  alt: string;
  eager?: boolean;
}) {
  const base = name.replace(/\.(png|webp)$/, '');
  return (
    // oxlint-disable-next-line next/no-img-element -- Precompressed responsive WebP assets avoid a runtime image transformation.
    <img
      src={'/assets/' + base + '-864.webp'}
      srcSet={
        '/assets/' + base + '-480.webp 480w, /assets/' + base + '-864.webp 864w'
      }
      sizes="(max-width: 600px) 90vw, 550px"
      alt={alt}
      width={864}
      height={864}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : 'auto'}
    />
  );
}
