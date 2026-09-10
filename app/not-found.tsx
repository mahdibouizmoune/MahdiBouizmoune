/* oxlint-disable next/no-html-link-for-pages -- Full document navigation preserves prerendered locale documents. */
import {Header,Footer,Contact} from '../components/portfolio-shell';
import {dictionary} from '../lib/i18n';
export default function NotFound(){const d=dictionary('en');return <><Header/><main id="main" tabIndex={-1}><section className="wrap section"><h1>{d.meta.notFound}</h1><p>{d.meta.notFoundCopy}</p><a className="button outline" href="/">{d.meta.returnHome}</a></section><Contact/></main><Footer/></>;}
