import Link from 'next/link'

export default function Home({data}) {
  return (
    <div style={{padding: '1.5rem'}}>
      {/* loop over the posts and show them */}
      {data.map(post => (
         <Link href={post.slug} key={post.id}>
           <div style={{marginBottom: '1rem', cursor: 'pointer'}}>
             <h2>{post.title}</h2>
             <p>{post.User?.username}</p>
           </div>
         </Link>
      ))}
    </div>
  )
}

export async function getStaticProps() {
 // get posts from our API
  const res = await fetch(`${process.env.STRAPI_URL}/posts?populate=*`)
  const {data} = await res.json()

  return {
  props: {data},
    revalidate: 120
  }
}

