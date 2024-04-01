export default function Multi({ params }: { params: { slug: string[] } }) {
  if (params.slug.length === 1) {
    return <h1>One Page Only</h1>;
  } else {
    return <h1>Multi Page</h1>;
  }
}
