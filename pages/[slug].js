import Link from 'next/link'

export default function Post({post}) {
   return (
      <div>
         <Link href={'/'}>Home</Link>
         <h2>{post?.title || 'No Title'}</h2>
         <p>{post?.content || 'No Content'}</p>
         <hr/>
         {post?.comments && post?.comments?gi.map(comment => (
            <p style={{padding: '1rem', margin: '1rem', border: '1px solid black'}} key={comment.id}>{comment.content}</p>
         ))}
      </div>
   )
}

// tell next.js how many pages there are
export async function getStaticPaths() {
   const res = await fetch(`${process.env.STRAPI_URL}/posts`)
   const {data} = await res.json()
   const paths = data?.map(post => ({
      params: {
         slug: post.slug
      }
   }))

   return {
      paths,
      fallback: true
   }
}

// for each individual page, get the data for that page
export async function getStaticProps({params}) {
   const {slug} = params

   const res = await fetch(`${process.env.STRAPI_URL}/posts?filters[slug][$eq]=${slug}&populate=*`)
   const {data} = await res.json()
   const post = data[0]

   return {
      props: {post}
   }
}