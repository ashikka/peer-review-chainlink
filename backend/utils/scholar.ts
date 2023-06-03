import axios from 'axios';
import { JSDOM } from 'jsdom';

export async function getScholarDetails(url: string) {
    const page: string = (await axios.get(url)).data;
    const dom = new JSDOM(page);
    const name = dom.window.document.getElementById('gsc_prf_in').textContent;
    const affiliation = dom.window.document.getElementsByClassName('gsc_prf_il')[0].textContent;
    const email = dom.window.document.getElementsByClassName('gsc_prf_il')[1].textContent;
    const hindex = dom.window.document.getElementsByClassName('gsc_rsb_std')[2]?.textContent || 0;
    const citations = dom.window.document.getElementsByClassName('gsc_rsb_std')[0]?.textContent || 0;
    
    return {
        name, affiliation, email, hindex, citations,
    };
}
