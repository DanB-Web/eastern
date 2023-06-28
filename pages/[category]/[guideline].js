import Link from 'next/link'
import { API_URL } from '../../config/index.js'
import axios from 'axios'
import { MainHeading, SubHeading, Content, Label, Flowchart, Calculator, Equation, TrustSpecific, Table, SupportingImage, SupportingVideo } from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'

export default function Guideline({ data }) {

    if (!data?.body) {
        return
    }

    // Empty array to push content into
    let content = [];

    // Iterate over data body, inspect data type and rerturn appropriate component
    data.body.forEach((block) => {
        if (block.type === 'main') {
            // Extract Main heading
            content.push(<MainHeading key={block.id} heading={block.value.mainheading} />)
        }
        if (block.type === 'guideline') {
            // Extract Sub Heading
            content.push(<SubHeading key={block.id} heading={block.value.sub.subheading}/>)
            // Iterate over content array
            block.value.info.forEach(el => {
                if (el.type === 'content') {
                    const { id, value: { content : pageContent }} = el;
                    content.push(<Content key={id} content={pageContent}/>)
                }
                if (el.type === 'label') {
                    const { id, value } = el;
                    const { label, label_content } = value;
                    content.push(<Label key={id} type={label} label={label_content}/>)
                }
                if (el.type === 'flowchart') {
                    const { id, value: { flowchart }} = el;
                    content.push(<Flowchart key={id} flowchart={flowchart}/>)
                }
                if (el.type === 'calculator') {
                    const { id , value: { calculator }} = el;
                    content.push(<Calculator key={id} calculator={calculator}/>)
                }
                if (el.type === 'equation') {
                    const { id, value } = el;
                    const { title, equation } = value;
                    content.push(<Equation key={id} title={title} equation={equation}/>)
                }
                if (el.type === 'trust') {
                    const { id, value } = el;
                    const { trust, content: trustContent } = value;
                    content.push(<TrustSpecific key={id} trust={trust} content={trustContent}/>)
                }
                if (el.type === 'table') {
                    const { id, value } = el;
                    const { title, head, body } = value;
                    content.push(<Table key={id} title={title} head={head} body={body} />)
                }
                 if (el.type === 'image') {
                    const { id, value } = el;
                    const { title, original } = value; 
                    content.push(<SupportingImage key={id} title={title} image={original}/>)
                }
                if (el.type === 'video') {
                    const {id, value} = el;
                    const { title, url, type } = value;
                    content.push(<SupportingVideo key={id} title={title} url={url} type={type}/>)
                }
            })

        }
    })

    return (
      <main className="flex flex-col">
        <div className="title-header flex items-center">
            <Link className="pl-4" href="/">
                <FontAwesomeIcon icon={faHouse}/>
            </Link>
            <h1 className="w-full">{data.title}</h1>
        </div>
        <div className="bg-lightBackground p-4 min-h-screen">{[...content]}</div>
      </main>
    );   
}

export async function getStaticPaths() {

    const getPages = async () => {
        const res = await axios(
            `${API_URL}/pages/`
        );
        return res.data;
    } ;

    // Get all Pages
    const pages = await getPages()

    const pageTree = {}

    // Filter out Guideline Indexes
    pages.items.forEach((item) => {
        if (item?.meta?.type === "guidelines.GuidelineIndexPage") {
            const { title, meta } = item
            const { slug } = meta;
            pageTree[`${item.meta.slug}`] = {
                title,
                slug,
                children: []
            };
        }
    })

    // Add Guideline Pages
    pages.items.forEach((item) => {
        if (item?.meta?.type === "guidelines.Guideline") {
          const url = new URL(item.meta.html_url);
          let path = url.pathname;

          // Remove leading slash
          if (path.charAt(0) === "/") {
            path = path.substring(1);
          }
          const pathArr = path.split("/");

          // Check for category inside pageTree
          if (pathArr[0] in pageTree) {
            pageTree[`${pathArr[0]}`].children.push({
              // id: item.id,
              category: pathArr[0],
              guideline: pathArr[1],
            });
          }
        }
    })

    // Create paths array
    const paths = []
    
    Object.keys(pageTree).forEach((key) => {
        pageTree[key].children.forEach((child) => {
            paths.push({
                params: {
                    category: child.category,
                    guideline: child.guideline, 
                }
            })
        })
    })

    /*
    Return { params : { category: 'xxxx', guideline: 'xxxx' } }
    Cannot pass extra props (e.g. id)
    */
    return {
        paths,
        fallback: false,
    }

}

export async function getStaticProps({ params: { guideline }}) {

    const getPageBySlug = async (slug) => {
        // console.log('slug', slug)
        const res = await axios(
            `${API_URL}/pages/?type=guidelines.Guideline&slug=${slug}`
        );
        // console.log('[getPageBySlug] - Slug', res.data)
        const { id } = res.data.items[0];
        const page = await axios(`${API_URL}/pages/${id}/?&fields=*`);
        // console.log("[getPageBySlug] - Page", page);
        return page.data;
    };

    const res = await getPageBySlug(guideline)

    return {
        props: { 
            data: res 
        }
    }
}

