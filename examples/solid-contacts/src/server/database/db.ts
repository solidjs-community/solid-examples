import { IContact } from '~/server/database/entities/contact'
import { IUser } from '~/server/database/entities/user'

const users: IUser[] = []
let contacts: IContact[] = []

async function createUser(username: string) {
    if (await getUser(username)) throw Error('User already exists')

    const user: IUser = {
        username,
    }

    const initialContacts: IContact[] = sampleContacts.map((x) => ({
        ...x,
        ownerUserId: user.username,
    }))

    users.push(user)
    contacts.push(...initialContacts)

    return user
}

async function getUser(username: string): Promise<IUser | undefined> {
    return users.find((x) => x.username === username)
}

async function getRequiredContact(id: string) {
    const contact = contacts.find((x) => x.id === id)
    if (!contact) throw new Error(`Contact ${id} not found`)
    return contact
}

async function createContact(contact: IContact) {
    contacts.push(contact)
    return contact
}

async function updateContact(contactId: string, updatedContact: IContact) {
    const contact = await getRequiredContact(contactId)

    Object.assign(contact, {
        ...updatedContact,
        id: contact.id,
        favorite: contact.favorite,
    })

    return contact
}

async function getContactsForUser(username: string, contactIds?: string[]) {
    return contacts.filter(
        (x) =>
            x.ownerUserId === username &&
            (!contactIds || contactIds.includes(x.id))
    )
}

async function getContactForUser(username: string, contactId: string) {
    return contacts.find(
        (x) => x.ownerUserId === username && x.id === contactId
    )
}

async function getAllContacts() {
    return [...sampleContacts] as IContact[]
}

async function favoriteContact(contactId: string, favorite: boolean) {
    const contact = await getRequiredContact(contactId)
    Object.assign(contact, { favorite: favorite })

    return contact
}

async function deleteContact(contactId: string) {
    const contactIndex = contacts.findIndex((x) => x.id === contactId)
    if (contactIndex === -1) return

    contacts.splice(contactIndex, 1)
}

async function deleteContacts(contactIds: string[]) {
    contacts = contacts.filter((x) => !contactIds.includes(x.id))
}

export const db = {
    createUser,
    getUser,
    getContactsForUser,
    getContactForUser,
    getAllContacts,
    createContact,
    updateContact,
    favoriteContact,
    deleteContact,
    deleteContacts,
}

const sampleContacts = [
    {
        id: 'd607fbe0-c92e-4c40-8a73-d04cbd3ff962',
        name: 'Georgianne Perch',
        email: 'gperch0@guardian.co.uk',
        phone: '4384573457',
    },
    {
        id: 'cf0db428-093a-4210-a144-e5fc988ed8ef',
        name: 'Reeta Puddifer',
        email: 'rpuddifer1@ftc.gov',
        phone: '9307014184',
    },
    {
        id: 'e7ab27b3-a256-4ee5-b88d-a6487f5349d4',
        name: 'Dacia Rojas',
        email: 'drojas2@google.com',
        phone: '7132415007',
    },
    {
        id: '24071d58-1da1-4209-9664-83353efc4440',
        name: 'Ida Edgecombe',
        email: 'iedgecombe3@booking.com',
        phone: '4304442619',
    },
    {
        id: 'ccc32bed-2e24-4206-8e63-1e646e621650',
        name: 'Demetra Crowche',
        email: 'dcrowche4@yelp.com',
        phone: '8975798901',
    },
    {
        id: '5357c6cd-57f7-43e8-aec0-a294f860b92f',
        name: 'Devonne De Michele',
        email: 'ddemichele5@businessweek.com',
        phone: '8304208161',
    },
    {
        id: 'e0888ab5-530d-4da7-b0dd-9bda35d64bc2',
        name: 'Tad Mattityahou',
        email: 'tmattityahou6@dion.ne.jp',
        phone: '5134090176',
    },
    {
        id: 'b98ca9b4-46f9-443e-8c16-5cf7b3c28774',
        name: 'Esther Mohun',
        email: 'emohun7@last.fm',
        phone: '7684326394',
    },
    {
        id: 'f9de7f0a-361c-414a-ac55-b230c2ab91cb',
        name: 'Electra Giddons',
        email: 'egiddons8@google.pl',
        phone: '2119304049',
    },
    {
        id: '23527ce7-0566-4a2f-851a-bca5f5c8bd14',
        name: 'Erin Dorber',
        email: 'edorber9@bbc.co.uk',
        phone: '9958519735',
    },
    {
        id: '5858c860-3087-4760-904e-d92cc215ea22',
        name: 'Ana Torres',
        email: 'atorresa@wix.com',
        phone: '6035688406',
    },
    {
        id: '2695a847-f0b4-4ffa-9f30-ac9e96a845f7',
        name: 'Vaughn Clynter',
        email: 'vclynterb@seattletimes.com',
        phone: '4151269481',
    },
    {
        id: '81f97e33-424d-466a-82ed-a2559b144c89',
        name: 'Kerrill Lukins',
        email: 'klukinsc@mapy.cz',
        phone: '3449514367',
    },
    {
        id: '97b756b5-63f7-48fb-86ae-86be23f1b2ae',
        name: 'Judah Isard',
        email: 'jisardd@surveymonkey.com',
        phone: '9915578050',
    },
    {
        id: '18458d53-1c64-4634-b89f-378ce28e445a',
        name: 'Mendy Beddow',
        email: 'mbeddowe@pcworld.com',
        phone: '2468960395',
    },
    {
        id: '6d1ab806-4557-40b0-834b-ff50ded2b4d3',
        name: 'Lockwood McKeefry',
        email: 'lmckeefryf@nbcnews.com',
        phone: '1857500953',
    },
    {
        id: 'e9c983eb-c99d-4cbf-98af-0ff7090c002c',
        name: 'Lilla Hazleton',
        email: 'lhazletong@vimeo.com',
        phone: '5426504225',
    },
    {
        id: '46ef4d33-8340-435e-a7db-93915dd55cf3',
        name: 'Eydie Blondin',
        email: 'eblondinh@shinystat.com',
        phone: '9035997140',
    },
    {
        id: '86adf0ab-535b-4755-b854-f399cbacf518',
        name: 'Rodolphe Reese',
        email: 'rreesei@usnews.com',
        phone: '2962975559',
    },
    {
        id: '58c87a17-9b4f-4f8b-89e8-913fa8224973',
        name: 'Terese Mc Ilwrick',
        email: 'tmcilwrickj@gnu.org',
        phone: '6859284732',
    },
    {
        id: '7065a2e0-463d-4b1c-9a61-d85327fe22db',
        name: 'Ki Lilley',
        email: 'klilleyk@ebay.com',
        phone: '2076704690',
    },
    {
        id: 'f887ceed-c946-4ecb-9fb0-d7d25ffa3cde',
        name: 'Mallissa Corrado',
        email: 'mcorradol@bigcartel.com',
        phone: '6464323988',
    },
    {
        id: '6f38e393-094a-468b-92c5-79c8bdc56c98',
        name: 'Merrel Yablsley',
        email: 'myablsleym@infoseek.co.jp',
        phone: '4492071739',
    },
    {
        id: '2f1f203c-9c25-4ef7-bc44-69353e9f269e',
        name: 'Caprice Le Quesne',
        email: 'clequesnen@slate.com',
        phone: '5761778631',
    },
    {
        id: '17102a11-d540-46b7-ab80-9a235de8cb9b',
        name: 'Bethina Armstrong',
        email: 'barmstrongo@hao123.com',
        phone: '9779825018',
    },
    {
        id: '6c4fec8e-4c43-4ba7-8585-f81dba67f39b',
        name: 'Jarid Bourhill',
        email: 'jbourhillp@imgur.com',
        phone: '2828112265',
    },
    {
        id: '57acfcfa-d4a2-4fc9-8a33-6d1027c38755',
        name: 'Sabina Labbey',
        email: 'slabbeyq@blogtalkradio.com',
        phone: '9133243006',
    },
    {
        id: 'cca9b6b5-7531-4ac6-b965-b7b7f0629306',
        name: 'Neille Draxford',
        email: 'ndraxfordr@lycos.com',
        phone: '9037160675',
    },
    {
        id: 'fe0599df-a9ed-4447-96a9-29e55baa76a1',
        name: 'Savina Tosdevin',
        email: 'stosdevins@discuz.net',
        phone: '2091146997',
    },
    {
        id: '81e606d5-c792-4793-b4c0-2dad063c7a19',
        name: 'Jaye Pedersen',
        email: 'jpedersent@jugem.jp',
        phone: '1375426899',
    },
    {
        id: 'b8655138-bf14-4120-975f-1cf8b774b0b5',
        name: 'Tabor McInnery',
        email: 'tmcinneryu@youku.com',
        phone: '1458372927',
    },
    {
        id: 'eab2ef76-c40a-4887-8537-9fce785a7fbc',
        name: 'Ethelin Varnam',
        email: 'evarnamv@cisco.com',
        phone: '4408968552',
    },
    {
        id: '2fc4a73e-9f0b-419c-bb15-7026244a44da',
        name: 'Ariela Caldayrou',
        email: 'acaldayrouw@opensource.org',
        phone: '6963026743',
    },
    {
        id: '32bbb99b-ec78-43ab-96e2-1fb0313210af',
        name: 'Jeannine Colomb',
        email: 'jcolombx@nifty.com',
        phone: '8495064335',
    },
    {
        id: '3cf92e71-1033-46cd-a061-56ca76bf98cb',
        name: 'Oneida Blackey',
        email: 'oblackeyy@amazon.com',
        phone: '2534145794',
    },
    {
        id: 'cec6d01f-415f-43e3-95dc-0e74db4891e2',
        name: 'Nat Matevushev',
        email: 'nmatevushevz@businessweek.com',
        phone: '7106242823',
    },
    {
        id: '0dcfa012-f988-4795-a0b2-050bbb8813bd',
        name: 'Rurik Hacun',
        email: 'rhacun10@aboutads.info',
        phone: '9775663839',
    },
    {
        id: 'e9c341a9-224b-45f0-99ad-e2d394c12293',
        name: 'Corinna Cowderay',
        email: 'ccowderay11@paginegialle.it',
        phone: '7541570165',
    },
    {
        id: '1a9569ad-1701-49cc-9d76-36b033232595',
        name: 'Meade Dear',
        email: 'mdear12@examiner.com',
        phone: '9126129410',
    },
    {
        id: '225bf00e-57f9-4d22-a7f2-072daf9a0e6a',
        name: 'Harland Stainton',
        email: 'hstainton13@virginia.edu',
        phone: '3788924461',
    },
    {
        id: '94bbc95c-3180-40bf-89be-9f6878c7e807',
        name: 'Ardine Theodoris',
        email: 'atheodoris14@google.ru',
        phone: '4714744708',
    },
    {
        id: '7a4aca36-cc7d-471a-b1ad-51fbde98dd7e',
        name: 'Bary Dasent',
        email: 'bdasent15@elegantthemes.com',
        phone: '5356571944',
    },
    {
        id: '0b32ef11-5070-4617-bf36-1341ec9d234c',
        name: 'Hephzibah McKennan',
        email: 'hmckennan16@blogger.com',
        phone: '8238787862',
    },
    {
        id: 'cf52c849-3195-41df-9488-432036198b3a',
        name: 'Harli Baudassi',
        email: 'hbaudassi17@fastcompany.com',
        phone: '6606444278',
    },
    {
        id: '82ec5847-eb31-4ae1-8004-0547a3384585',
        name: 'Pippy Doni',
        email: 'pdoni18@apple.com',
        phone: '2967509815',
    },
    {
        id: '39750a59-0a1a-40f1-8b29-d761dfad15e0',
        name: 'Jeremie Mantrup',
        email: 'jmantrup19@opensource.org',
        phone: '1664987206',
    },
    {
        id: '13239ac1-1f03-49ce-bb55-a87398ee6663',
        name: 'Krystal Dahle',
        email: 'kdahle1a@php.net',
        phone: '3291069122',
    },
    {
        id: '5e4d8810-a4fc-478b-916b-02940186d80e',
        name: 'Raimundo Nutley',
        email: 'rnutley1b@cbsnews.com',
        phone: '2472937966',
    },
    {
        id: 'a0c60809-3600-4de1-9a8d-ba9300e6ac42',
        name: 'Adelina Fairholme',
        email: 'afairholme1c@so-net.ne.jp',
        phone: '7337417482',
    },
    {
        id: 'a702e403-ae12-419a-ba82-6a1959efe2de',
        name: 'Godart Yaxley',
        email: 'gyaxley1d@slate.com',
        phone: '2523686061',
    },
    {
        id: '7c0976e6-22cb-4d94-a7c8-0c584a6c6ab2',
        name: 'Peggi Treherne',
        email: 'ptreherne1e@posterous.com',
        phone: '7008532944',
    },
    {
        id: 'f927de8e-5bf1-4b5f-83c0-93b1bba9072a',
        name: 'Base Dolman',
        email: 'bdolman1f@reverbnation.com',
        phone: '8617840729',
    },
    {
        id: '04d6dddd-6467-4200-8b79-c7c84640c2ba',
        name: 'Ashia Puddin',
        email: 'apuddin1g@spotify.com',
        phone: '9602815983',
    },
    {
        id: 'e5fa42dc-913f-47ef-ab5e-c6984fd7e6b8',
        name: 'Roger Presdie',
        email: 'rpresdie1h@themeforest.net',
        phone: '7964541536',
    },
    {
        id: 'c419f7b2-080f-4223-99c8-aa1d7497ae48',
        name: 'Gabby Boni',
        email: 'gboni1i@theatlantic.com',
        phone: '8357036637',
    },
    {
        id: '103f9e07-79f1-445c-8a0c-f13b77e49062',
        name: 'Garold Barck',
        email: 'gbarck1j@joomla.org',
        phone: '1111884723',
    },
    {
        id: 'e7ac4ad4-2101-4d4f-b2d2-2ba26931b77c',
        name: 'Perrine Claibourn',
        email: 'pclaibourn1k@dell.com',
        phone: '8126337357',
    },
    {
        id: 'a85144eb-4752-4ccc-b8f4-2168117b9067',
        name: 'Chris Reinbech',
        email: 'creinbech1l@bbc.co.uk',
        phone: '9279091217',
    },
    {
        id: '052ad465-88d8-4c0e-b7b3-758a5e6cc9a3',
        name: 'Mose Duffil',
        email: 'mduffil1m@nydailynews.com',
        phone: '8555889204',
    },
    {
        id: 'c530eb5a-3331-48b4-b48b-6ed307d155e4',
        name: 'Reg Boxill',
        email: 'rboxill1n@army.mil',
        phone: '9668919890',
    },
    {
        id: 'fc8859ca-c635-46e7-8f30-2d119c6de971',
        name: 'Orelle Bullon',
        email: 'obullon1o@ycombinator.com',
        phone: '3116262592',
    },
    {
        id: '7f213b8a-6fda-4ffd-9152-1ddcc99b4cea',
        name: 'Orly Niblett',
        email: 'oniblett1p@ezinearticles.com',
        phone: '9385172897',
    },
    {
        id: 'c0a282dd-a556-4403-a7cc-d1995ea25110',
        name: 'Melinda Kyme',
        email: 'mkyme1q@uol.com.br',
        phone: '9675477123',
    },
    {
        id: 'f4815b12-ecec-45e6-896f-2f1f5010aac9',
        name: 'Forester Ingman',
        email: 'fingman1r@geocities.com',
        phone: '7148969467',
    },
    {
        id: '165df334-ab08-48db-8f1f-46ff370e6209',
        name: 'Antony Jorgesen',
        email: 'ajorgesen1s@devhub.com',
        phone: '3439966932',
    },
    {
        id: '7b4ae34e-5059-468a-b882-8648ee9fe554',
        name: 'Fidelia Stronach',
        email: 'fstronach1t@ox.ac.uk',
        phone: '9488755627',
    },
    {
        id: '32dffbb5-d3a9-490e-99d6-147607f39d05',
        name: 'Bevin Newson',
        email: 'bnewson1u@lulu.com',
        phone: '8199403513',
    },
    {
        id: '244b8cee-6c0b-48e7-aa30-eea15ac44e08',
        name: 'Brien Kibby',
        email: 'bkibby1v@tuttocitta.it',
        phone: '1901648157',
    },
    {
        id: '5f536009-d803-4907-b1ac-b995cc21fda1',
        name: 'Jobey Thouless',
        email: 'jthouless1w@cpanel.net',
        phone: '8694300016',
    },
    {
        id: 'f950d90f-227c-4982-be8d-115cba23822a',
        name: 'Gill Grieve',
        email: 'ggrieve1x@reference.com',
        phone: '4667327091',
    },
    {
        id: 'd020997d-626d-459b-989c-26565786d131',
        name: 'Shelley Timperley',
        email: 'stimperley1y@miitbeian.gov.cn',
        phone: '7979597978',
    },
    {
        id: 'c40b3b10-6d53-41da-996e-26d191094b5f',
        name: 'Connie Shutt',
        email: 'cshutt1z@wix.com',
        phone: '3161777544',
    },
    {
        id: '03a7b27c-32bc-4f8f-90b7-ab98d8bae03d',
        name: 'Susy McElvogue',
        email: 'smcelvogue20@scribd.com',
        phone: '1185298197',
    },
    {
        id: 'c80a74b1-281d-4718-b667-db629dc39807',
        name: 'Massimo Mosco',
        email: 'mmosco21@nytimes.com',
        phone: '1933321615',
    },
    {
        id: 'c0a2d5f2-aea1-452b-93e6-d4c23fa6966c',
        name: 'Chalmers Vowell',
        email: 'cvowell22@cdbaby.com',
        phone: '8641896723',
    },
    {
        id: '82f6824b-a468-4378-9580-9162eec782e5',
        name: 'Paul De Hoogh',
        email: 'pdehoogh23@wired.com',
        phone: '6609010638',
    },
    {
        id: '89ab3c09-fee3-4a1c-a476-1babe8a51de9',
        name: 'Regine Sherborne',
        email: 'rsherborne24@typepad.com',
        phone: '3171389745',
    },
    {
        id: '6d47bcde-c9e2-4c86-91cb-29ec5a200954',
        name: 'Major Lamplough',
        email: 'mlamplough25@360.cn',
        phone: '8979368888',
    },
    {
        id: '5c060cc3-12e8-4ee4-a174-2ce5b1b00fd1',
        name: 'Gerry Seed',
        email: 'gseed26@xing.com',
        phone: '5532734569',
    },
    {
        id: 'c13a6846-e715-44da-815b-70472d9fc795',
        name: 'Ignazio Hutson',
        email: 'ihutson27@seattletimes.com',
        phone: '1803910929',
    },
    {
        id: '37792f51-4745-40f8-805b-3b6e484db00d',
        name: 'Leonanie Morison',
        email: 'lmorison28@so-net.ne.jp',
        phone: '2615192057',
    },
    {
        id: '24ec465e-49f8-4940-a8a5-f5cd79ff69db',
        name: 'Esdras Juggings',
        email: 'ejuggings29@ifeng.com',
        phone: '2505986148',
    },
    {
        id: 'b26a2eb1-52e7-4abb-a752-b78676c7a750',
        name: 'Clayborne Harkess',
        email: 'charkess2a@cbc.ca',
        phone: '4462615707',
    },
    {
        id: '0f8a5bed-8b53-4c9b-84d2-f7a07482ebfd',
        name: 'Esme Frankland',
        email: 'efrankland2b@slate.com',
        phone: '6584521995',
    },
    {
        id: 'd5a86173-1c4a-4b61-8e59-e19c08bb4e4d',
        name: 'Mattie Breewood',
        email: 'mbreewood2c@sina.com.cn',
        phone: '4345188680',
    },
    {
        id: '35708b54-9cbb-41ea-9cea-4f86a1af17b3',
        name: 'Winifred Hentzer',
        email: 'whentzer2d@amazon.co.jp',
        phone: '8872626102',
    },
    {
        id: '3ce092e4-e43a-438f-8ded-b0464cdcafcb',
        name: 'Hal Slyford',
        email: 'hslyford2e@(protected).pl',
        phone: '9782186084',
    },
    {
        id: 'e7871d13-76ed-42d6-8614-a3f1b70ed01d',
        name: 'Lauree Charity',
        email: 'lcharity2f@google.co.jp',
        phone: '5775306164',
    },
    {
        id: '79746a78-479d-4b4c-a1a2-051be214dae9',
        name: 'Clim Marlon',
        email: 'cmarlon2g@chicagotribune.com',
        phone: '7507612217',
    },
    {
        id: '28ddadf3-6643-4224-8ebc-cdc4c2211c2a',
        name: 'Tymon Spradbery',
        email: 'tspradbery2h@unc.edu',
        phone: '9977265520',
    },
    {
        id: 'fa1e835b-ceab-4a89-8d78-acffd64506df',
        name: 'Charleen Martt',
        email: 'cmartt2i@google.com.br',
        phone: '6755260083',
    },
    {
        id: 'ffe70d00-1977-46bf-8401-c8ce208f8b2a',
        name: 'Ethelda Odby',
        email: 'eodby2j@un.org',
        phone: '1964049433',
    },
    {
        id: '387f82c6-d57c-4be7-b618-6e8e5da02530',
        name: 'Tanitansy McAughtrie',
        email: 'tmcaughtrie2k@ftc.gov',
        phone: '6439084162',
    },
    {
        id: '864e7dee-daa8-41de-b827-54b534326e4f',
        name: 'Maitilde Willcocks',
        email: 'mwillcocks2l@imgur.com',
        phone: '4095218494',
    },
    {
        id: '4484c729-a75c-4699-a59d-1ad94fd8c062',
        name: 'Valry Itzcak',
        email: 'vitzcak2m@squidoo.com',
        phone: '3178289724',
    },
    {
        id: 'a0bd065f-7c07-4fc4-8eda-b93aae3d6555',
        name: 'Jeni Cainey',
        email: 'jcainey2n@github.com',
        phone: '4474027346',
    },
    {
        id: 'b452e5df-ef9f-4e55-9133-fbb6bdad71d3',
        name: 'Hildegaard Goldney',
        email: 'hgoldney2o@google.com.br',
        phone: '3284231505',
    },
    {
        id: '84911235-5616-4870-962b-c55ebf87e76d',
        name: 'Luther Jamme',
        email: 'ljamme2p@nifty.com',
        phone: '2023508518',
    },
    {
        id: 'e2fb43f9-c67f-4ad2-83db-af904e3010ce',
        name: 'Lilith Turri',
        email: 'lturri2q@ucoz.ru',
        phone: '3278012874',
    },
    {
        id: 'f11a9f09-e717-46d0-85dc-8e4670156440',
        name: 'Helen Proger',
        email: 'hproger2r@altervista.org',
        phone: '6675754598',
    },
    {
        id: 'de5fcf66-2471-4580-a761-8edee1a2037b',
        name: 'Bonnie Bastin',
        email: 'bbastin2s@webs.com',
        phone: '9696260053',
    },
    {
        id: '5e6b6d2e-c571-4e2f-9279-289708629813',
        name: 'Henri Portman',
        email: 'hportman2t@marriott.com',
        phone: '2338160116',
    },
    {
        id: '4b5a41de-d22a-4782-adc3-b2a05a1a5b47',
        name: 'Gabey Alten',
        email: 'galten2u@webeden.co.uk',
        phone: '3436316317',
    },
    {
        id: 'e65b3cc2-1e25-4cd2-a3b5-6238c2eefd50',
        name: 'Perceval Weeke',
        email: 'pweeke2v@comsenz.com',
        phone: '2832628566',
    },
    {
        id: 'cfc3427d-982d-4609-bac7-cb5f477d4fbc',
        name: 'Padraig Lamdin',
        email: 'plamdin2w@sbwire.com',
        phone: '9992147132',
    },
    {
        id: 'b397e956-edcb-4059-83b4-4b2e518b21bc',
        name: 'Ahmed Mountfort',
        email: 'amountfort2x@google.es',
        phone: '6691060615',
    },
    {
        id: 'c0809212-3bdd-41fe-8e30-1bf7c433e295',
        name: 'Derick Starking',
        email: 'dstarking2y@arstechnica.com',
        phone: '1138331574',
    },
    {
        id: '48b789dd-c9ab-4b0a-b32c-f71954b0dd9c',
        name: 'Eldridge Pigne',
        email: 'epigne2z@ox.ac.uk',
        phone: '1112715426',
    },
    {
        id: '1d046153-a222-4429-adc6-7247b93291ae',
        name: 'Rana Hexham',
        email: 'rhexham30@163.com',
        phone: '6803243681',
    },
    {
        id: 'e6edf1e7-aeef-4570-8179-6b7668399240',
        name: 'Fleurette Adriaens',
        email: 'fadriaens31@google.nl',
        phone: '6061750335',
    },
    {
        id: 'f34c0173-2178-466b-825e-c3667e417087',
        name: 'Bobbie Versey',
        email: 'bversey32@sina.com.cn',
        phone: '5611753423',
    },
    {
        id: 'f404e2d9-764e-4eef-8203-a5c15effcfca',
        name: 'Lezlie Bullin',
        email: 'lbullin33@biblegateway.com',
        phone: '6331479453',
    },
    {
        id: '606da11c-d36a-4713-b151-7fcd2d6fce54',
        name: 'Sherie Jost',
        email: 'sjost34@weibo.com',
        phone: '3503791527',
    },
    {
        id: '82a32ad2-0583-4b06-9e34-02e4ba36f28d',
        name: 'Chrystal Creigan',
        email: 'ccreigan35@cyberchimps.com',
        phone: '2756323599',
    },
    {
        id: '89f19437-9ed4-4090-b3a0-2afb400c3b6b',
        name: 'Lindsy Gallo',
        email: 'lgallo36@icq.com',
        phone: '1016005847',
    },
    {
        id: 'da05a4a7-7541-4b42-ae9b-649276d25408',
        name: 'Denis Brendeke',
        email: 'dbrendeke37@mediafire.com',
        phone: '5242782225',
    },
    {
        id: 'b85851f1-f74d-4ec2-b064-e8db832a599d',
        name: 'Isis Benza',
        email: 'ibenza38@hhs.gov',
        phone: '9124159012',
    },
    {
        id: '1d3bcdd1-47d0-4f38-99c8-850dd7d00b27',
        name: 'Spencer Lambswood',
        email: 'slambswood39@ox.ac.uk',
        phone: '8159675608',
    },
    {
        id: 'c69af556-aa6b-4e8e-889a-0ff6c5d6c7d7',
        name: 'Dyanne Canto',
        email: 'dcanto3a@cam.ac.uk',
        phone: '4822463385',
    },
    {
        id: '5c999a16-a835-47ac-9537-f4bff9f96ddf',
        name: 'Claiborn Anmore',
        email: 'canmore3b@ask.com',
        phone: '7093316782',
    },
    {
        id: '35580389-fba4-4332-81ea-88440b85f19c',
        name: 'Ilysa Gumme',
        email: 'igumme3c@japanpost.jp',
        phone: '7079079501',
    },
    {
        id: 'c8581289-fab3-4833-9a48-f9a85e7f0874',
        name: 'Temple Benitti',
        email: 'tbenitti3d@technorati.com',
        phone: '3754777969',
    },
    {
        id: 'a6ceba63-618a-4700-9eae-2060cfa9033f',
        name: 'Nesta Ianni',
        email: 'nianni3e@skype.com',
        phone: '1038392245',
    },
    {
        id: '48e1a91b-6a41-4558-b394-3d93960eb3b9',
        name: 'Avivah Revie',
        email: 'arevie3f@mit.edu',
        phone: '9934126833',
    },
    {
        id: '14412544-addb-4ebb-94d5-9bed0b30c3d1',
        name: 'Anastasie Durrad',
        email: 'adurrad3g@nhs.uk',
        phone: '2062826196',
    },
    {
        id: 'bfa4e1bc-0454-4277-beb1-557c6e88a2fe',
        name: 'Cary Ribbens',
        email: 'cribbens3h@imageshack.us',
        phone: '3376015429',
    },
    {
        id: '7313a01f-3439-4bae-9d37-9923c5a1b1a6',
        name: 'Ramon Wales',
        email: 'rwales3i@bloglines.com',
        phone: '3014449862',
    },
    {
        id: 'e962bf39-e88f-454b-9d1d-70b101f5af13',
        name: 'Wileen Wethey',
        email: 'wwethey3j@baidu.com',
        phone: '4115618477',
    },
    {
        id: '13ce8123-23ed-4931-bc17-fe26cd3204f4',
        name: 'Gaspar Conquest',
        email: 'gconquest3k@washington.edu',
        phone: '5118392410',
    },
    {
        id: '22774fa1-1672-450a-9126-62462f174e51',
        name: 'Clo Probbin',
        email: 'cprobbin3l@netvibes.com',
        phone: '2758201805',
    },
    {
        id: '9fae5ae0-dd2d-404c-9ac4-3f46153652c6',
        name: 'Benjamin Peile',
        email: 'bpeile3m@artisteer.com',
        phone: '9546273912',
    },
    {
        id: '1118397e-0ef7-4781-94e9-5935dc126948',
        name: 'Finlay McFadden',
        email: 'fmcfadden3n@nifty.com',
        phone: '7267856244',
    },
    {
        id: '545879be-0b90-402b-b10c-dcc55f89577c',
        name: 'Dewie Preece',
        email: 'dpreece3o@time.com',
        phone: '1046771390',
    },
    {
        id: '6adc4f37-3ef3-4cf7-b439-e12188762bf7',
        name: 'Ermentrude Leathes',
        email: 'eleathes3p@answers.com',
        phone: '1052270354',
    },
    {
        id: '2300abeb-9520-429c-a2cd-776066e46047',
        name: 'Sylas Filipson',
        email: 'sfilipson3q@infoseek.co.jp',
        phone: '2801637297',
    },
    {
        id: '88e1ee9b-2604-4765-a1ac-63dcaa5623c0',
        name: 'Deborah Domniney',
        email: 'ddomniney3r@webmd.com',
        phone: '6772381114',
    },
    {
        id: 'a5a85cf0-005b-4ab7-b2a6-4cee1fb05674',
        name: 'Ellie Warters',
        email: 'ewarters3s@netscape.com',
        phone: '7289311510',
    },
    {
        id: '4c1bff4c-6c5a-45c7-a5e0-376422034a02',
        name: 'Laverne Wogdon',
        email: 'lwogdon3t@goo.ne.jp',
        phone: '6837228318',
    },
    {
        id: '53164781-b770-426a-ae44-813d5dd90ee5',
        name: 'Brittni Gergely',
        email: 'bgergely3u@angelfire.com',
        phone: '9242591274',
    },
    {
        id: 'ac396181-a4f6-4836-99f3-4c5f13b8775d',
        name: 'Annetta Nolder',
        email: 'anolder3v@cdc.gov',
        phone: '6882099005',
    },
    {
        id: '3ef6ec58-3119-4e9f-9247-26aab40ff578',
        name: 'Tammy Reilly',
        email: 'toreilly3w@fastcompany.com',
        phone: '3818801194',
    },
    {
        id: 'e0b2fa4b-ccfd-49b8-b97c-dda21e559b8c',
        name: 'Curr Petkovic',
        email: 'cpetkovic3x@gravatar.com',
        phone: '3631129356',
    },
    {
        id: '0c6cff4b-06a4-469e-964c-adcb63751c71',
        name: 'Petunia Peet',
        email: 'ppeet3y@spiegel.de',
        phone: '7197822703',
    },
    {
        id: '9784f639-5ccf-4e82-8dde-85c44fcb80d1',
        name: 'Janaye Balazot',
        email: 'jbalazot3z@discuz.net',
        phone: '1089734675',
    },
    {
        id: '3602faa5-552c-474f-ba8e-c5727bdb1c8f',
        name: 'Travers Rudgerd',
        email: 'trudgerd40@unc.edu',
        phone: '8514489575',
    },
    {
        id: 'f343c297-2a09-4539-978a-f13b00e4afba',
        name: 'Chrisy Leathard',
        email: 'cleathard41@bbb.org',
        phone: '6795529601',
    },
    {
        id: '3b5f0765-a778-4ea1-b1c1-4af30aca9d07',
        name: 'Louise Bahls',
        email: 'lbahls42@utexas.edu',
        phone: '1267897193',
    },
    {
        id: '61c46547-8437-42cf-9275-6df333cd0c23',
        name: 'Arabele Mulcaster',
        email: 'amulcaster43@over-blog.com',
        phone: '5443679999',
    },
    {
        id: '3eb13a4d-d11d-491a-8783-cdd4d4c916bb',
        name: 'Adriena Summerill',
        email: 'asummerill44@reverbnation.com',
        phone: '5215937207',
    },
    {
        id: '01afa282-50a6-456a-8ab9-c385da2f3e60',
        name: 'Loree Acory',
        email: 'lacory45@seesaa.net',
        phone: '5342092573',
    },
    {
        id: '4f582362-c3d2-4158-84f5-181f45eac2b0',
        name: 'Rasia Cronin',
        email: 'rcronin46@google.com',
        phone: '7299903770',
    },
    {
        id: 'd71de93f-48ed-4a92-b039-a988ba8c8ece',
        name: 'Garrott Benns',
        email: 'gbenns47@scribd.com',
        phone: '1186296621',
    },
    {
        id: '1695b59d-7da2-4ceb-9e0e-f4980a7879e9',
        name: 'Farris Janiszewski',
        email: 'fjaniszewski48@nationalgeographic.com',
        phone: '8797227515',
    },
    {
        id: '8923d11a-f819-4ee7-8664-bce4a6c7cba9',
        name: 'Myrah Sandom',
        email: 'msandom49@51.la',
        phone: '3732142334',
    },
    {
        id: 'bfdd5e9a-673c-4e84-a14d-c638c66c83d2',
        name: 'Karee Whalley',
        email: 'kwhalley4a@nhs.uk',
        phone: '3185004715',
    },
    {
        id: 'd8995c77-fdb9-4db3-811e-7a6169094465',
        name: 'Marleen Tully',
        email: 'mtully4b@bandcamp.com',
        phone: '3445304342',
    },
    {
        id: '8deca92f-63fc-46fe-b8b4-0acca0d76c70',
        name: 'Avie Hares',
        email: 'ahares4c@google.com.hk',
        phone: '1808807251',
    },
    {
        id: '54e25e37-c9fd-476b-be27-21a0a84856cf',
        name: 'Jenica Deary',
        email: 'jdeary4d@time.com',
        phone: '2799852035',
    },
    {
        id: '8c111553-68e0-4ddc-be4c-d09d6bb681ab',
        name: 'Nadiya Field',
        email: 'nafield4e@thetimes.co.uk',
        phone: '8981345921',
    },
    {
        id: 'fe96ed48-4069-48c1-85c9-1c45c7716fb1',
        name: 'Barnabe Rigler',
        email: 'brigler4f@comcast.net',
        phone: '5305878105',
    },
    {
        id: '587868f6-460c-4568-be77-f443c989e5fc',
        name: 'Halimeda Prendeguest',
        email: 'hprendeguest4g@miitbeian.gov.cn',
        phone: '2027999197',
    },
    {
        id: '645ffe68-44fb-4550-bcb1-bfb3fc1c8739',
        name: 'Inglis Baskeyfield',
        email: 'ibaskeyfield4h@nationalgeographic.com',
        phone: '7666423971',
    },
    {
        id: '734a8703-ecc8-4478-a778-41261c1b8c33',
        name: 'Ephrayim Beardsall',
        email: 'ebeardsall4i@ovh.net',
        phone: '9696479642',
    },
    {
        id: 'b48a0d33-1348-4f15-96e3-65f7bd18575d',
        name: 'Daron Wickersham',
        email: 'dwickersham4j@omniture.com',
        phone: '7459859429',
    },
    {
        id: 'cd4129a2-a1e8-4ac0-abb1-49079e8ea1f7',
        name: 'Robbie Aizlewood',
        email: 'raizlewood4k@sfgate.com',
        phone: '7914650290',
    },
    {
        id: '7f3ebfdf-5591-44d6-bce6-78acc1654250',
        name: 'Guinna Layus',
        email: 'glayus4l@yandex.ru',
        phone: '8237860203',
    },
    {
        id: 'd6ec4ab9-0f5e-4845-a030-cbd1744fcaec',
        name: 'Raye Fodden',
        email: 'rfodden4m@loc.gov',
        phone: '5044694435',
    },
    {
        id: '61aba605-6058-4ee4-b6e2-0428a0058bd8',
        name: 'Brucie Hesse',
        email: 'bhesse4n@example.com',
        phone: '1069351168',
    },
    {
        id: '17156195-3c5a-4db6-87bc-5bba53686e6f',
        name: 'Aubert Pounsett',
        email: 'apounsett4o@vistaprint.com',
        phone: '5208141385',
    },
    {
        id: '419082a3-efe8-4c01-a8eb-bfd0a3727de1',
        name: 'Ammamaria Parmiter',
        email: 'aparmiter4p@dagondesign.com',
        phone: '8687444694',
    },
    {
        id: 'be80e8c7-ba23-446b-ac1f-6a8adcf0bfba',
        name: 'Rosabel Davydoch',
        email: 'rdavydoch4q@cnet.com',
        phone: '5009914818',
    },
    {
        id: 'a1521b73-9ada-4be6-8eb4-f7378034d384',
        name: 'Natale Hassey',
        email: 'nhassey4r@mlb.com',
        phone: '6546723527',
    },
    {
        id: '46c4046f-f04d-43bd-bdaf-8aeefff41ec4',
        name: 'Carleen Baddeley',
        email: 'cbaddeley4s@cpanel.net',
        phone: '4221609074',
    },
    {
        id: 'b6ede11f-9e30-42e2-ac27-94d0dd617b6e',
        name: 'Kirbee Lipson',
        email: 'klipson4t@bizjournals.com',
        phone: '3175441655',
    },
    {
        id: 'c353df32-821d-402e-8b47-126eb51a62f0',
        name: 'Ethelbert Kinder',
        email: 'ekinder4u@utexas.edu',
        phone: '1994430515',
    },
    {
        id: 'ee2e5e4f-3696-4f30-ae5b-f288ccbca009',
        name: 'Timmie Musson',
        email: 'tmusson4v@oracle.com',
        phone: '5492205532',
    },
    {
        id: 'd2d7fc0b-f667-47b3-bcb5-5812039b4512',
        name: 'Bruce Fetherby',
        email: 'bfetherby4w@xrea.com',
        phone: '3028546846',
    },
    {
        id: '96091e75-34ae-4d3c-9b71-7256f536766d',
        name: 'Field Wintle',
        email: 'fwintle4x@uiuc.edu',
        phone: '3632988812',
    },
    {
        id: 'df6bdfa1-2948-45a6-a405-5f82270014b2',
        name: 'Darleen Quartermain',
        email: 'dquartermain4y@360.cn',
        phone: '6697702826',
    },
    {
        id: 'b26211ee-a867-44b8-903a-250c8b1d96b5',
        name: 'Norah Mattussevich',
        email: 'nmattussevich4z@sphinn.com',
        phone: '6521227116',
    },
    {
        id: '788cb8cf-da40-40da-8933-ea980573a3ea',
        name: 'Any McTerry',
        email: 'amcterry50@netvibes.com',
        phone: '5251162363',
    },
    {
        id: '656cc663-156c-4421-af2b-66ed72f65652',
        name: 'Lauretta Gorriessen',
        email: 'lgorriessen51@reverbnation.com',
        phone: '9509016909',
    },
    {
        id: 'ec55b444-6dee-47a3-af7a-109342a5be0e',
        name: 'Lauri Robion',
        email: 'lrobion52@bizjournals.com',
        phone: '2392735985',
    },
    {
        id: '84736755-43ce-498c-888b-baaf62d3efbe',
        name: 'Essy Triggel',
        email: 'etriggel53@google.ca',
        phone: '5793221819',
    },
    {
        id: '72fc0e6c-c045-42f0-9043-ed4b9f3641e7',
        name: 'Gabby Congrave',
        email: 'gcongrave54@gmpg.org',
        phone: '9414431434',
    },
    {
        id: 'b8887873-017d-4855-abc6-2b674e7a4cf2',
        name: 'Caril Castelletto',
        email: 'ccastelletto55@hubpages.com',
        phone: '7758700444',
    },
    {
        id: '385663d7-24b5-4138-a16c-e9705b48b851',
        name: 'Lorene Connaughton',
        email: 'lconnaughton56@youku.com',
        phone: '6928142183',
    },
    {
        id: '7479ecb7-374b-47c3-8cfb-2e6439e70e34',
        name: 'Duncan Bayless',
        email: 'dbayless57@yahoo.co.jp',
        phone: '4542631181',
    },
    {
        id: 'bccbe458-6283-4ebb-9a47-9a4c1fdd433f',
        name: 'Mellisent Ebbing',
        email: 'mebbing58@economist.com',
        phone: '9758200189',
    },
    {
        id: '336a206d-3acb-41aa-b1af-1a3f99d8af84',
        name: 'Culley Doxey',
        email: 'cdoxey59@europa.eu',
        phone: '8148908895',
    },
    {
        id: '73af0e20-f324-4f9d-a135-42eacb42694f',
        name: 'Killian Gavin',
        email: 'kogavin5a@globo.com',
        phone: '9335496664',
    },
    {
        id: '1741590d-8c93-4d23-91f2-c9bfc4342ba1',
        name: 'Franciskus Harner',
        email: 'fharner5b@163.com',
        phone: '8354411099',
    },
    {
        id: '314fbfd6-4db1-466b-9cc0-fff046372722',
        name: 'Janean McCrackan',
        email: 'jmccrackan5c@europa.eu',
        phone: '3966967636',
    },
    {
        id: 'ad00c7c8-1fe0-4b2b-8407-a7558de0df70',
        name: 'Gilligan Mustoe',
        email: 'gmustoe5d@vimeo.com',
        phone: '5355678377',
    },
    {
        id: '17188926-12bf-456a-8937-62ac84c56b56',
        name: 'Laurena Di Ruggiero',
        email: 'ldiruggiero5e@aol.com',
        phone: '2931159863',
    },
    {
        id: 'e2b5c431-b1dc-4687-9d41-205f12477141',
        name: 'Alberta Lowles',
        email: 'alowles5f@slideshare.net',
        phone: '9959063328',
    },
    {
        id: 'a861f155-3b93-4b8e-a31a-1a6f7f852824',
        name: 'Vanya Sleeford',
        email: 'vsleeford5g@i2i.jp',
        phone: '2526968938',
    },
    {
        id: '57bf4efb-bc52-4856-b753-6c4bf9551376',
        name: 'Siana Suckling',
        email: 'ssuckling5h@google.com',
        phone: '6727731722',
    },
    {
        id: 'b850c63a-5398-42d1-aea9-46bf38cfa357',
        name: 'Babbette Aldhouse',
        email: 'baldhouse5i@merriam-webster.com',
        phone: '4517496724',
    },
    {
        id: 'cc9c3f86-5100-4930-918b-f8d36d650816',
        name: 'Shay Bellingham',
        email: 'sbellingham5j@washingtonpost.com',
        phone: '4737994547',
    },
]
