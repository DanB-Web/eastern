// import getPages from './api/pages';
import { API_URL } from '../config/index.js'
import axios from "axios";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons'

export default function Home({pageTree}) {

  return (
    <main className="flex flex-col">
      <div className="title-header"><h1>Medical Guidelines</h1></div>
      <section className="bg-lightBackground p-4 min-h-screen">
        {Object.keys(pageTree).map((prop) => (
          <div key={pageTree[prop].id} className="border border-zinc-300 mb-2">
            <div className="main-header"><h2>{pageTree[prop].title}</h2></div>
            <ul className="bg-white">
              {pageTree[prop].children.map((child) => (
                <li key={child.id} className="index-links bg-white border border-t-zinc-300 p-4">
                  <Link href={`${child.path}`} className="flex justify-between font-bold text-xl">{child.title}<FontAwesomeIcon icon={faCircleChevronRight}/></Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  );
}

export async function getStaticProps() {

  const getPages = async () => {
    const res = await axios(
        `${API_URL}/pages/`
    );
    return res.data;
  };

  // All pages held by Wagtail
  const pages = await getPages()

  const pageTree = {}

  // Get categories indexes
  pages.items.forEach((item) => {
      if (item?.meta?.type === "guidelines.GuidelineIndexPage") {
        const { id, title, meta } = item
        const { html_url, slug} = meta
        pageTree[`${item.meta.slug}`] = {
          id,
          title,
          html_url,
          slug,
          children: []
        }
      }
    }
  );
  
  // Populate category children [] with appropriate urls
  pages.items.forEach((item) => {
    if (item?.meta?.type === "guidelines.Guideline") {
      const url = new URL(item.meta.html_url)
      let path = url.pathname

      // Remove leading slash
      if (path.charAt(0) === '/') {
        path = path.substring(1)
      }
      const pathArr = path.split('/')

      // Check for category inside pageTree
      if (pathArr[0] in pageTree) {
        pageTree[`${pathArr[0]}`].children.push(
          {
            id: item.id,
            title: item.title, 
            path: url.pathname
          }
        )
      }
    }
  })

  return { props: { pageTree }}
}
