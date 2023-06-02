import axios from 'axios';
import { JSDOM } from 'jsdom';

export async function getScholarDetails(url: string) {
    const page: string = (await axios.get(url)).data;
    const dom = new JSDOM(page);
    const name = dom.window.document.getElementById('gsc_prf_in').textContent;
    const affiliation = dom.window.document.getElementsByClassName('gsc_prf_il')[0].textContent;
    const email = dom.window.document.getElementsByClassName('gsc_prf_il')[1].textContent;

    return {
        name, affiliation, email
    };
}
