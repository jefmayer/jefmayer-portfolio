import SiteImage from '../components/site-image';

let siteData = [];

const getSiteData = () => (
  siteData
);

const getSectionAttribute = element => (
  element.getAttribute('data-section')
);

const initSiteData = () => {
  const assetList = document.querySelectorAll('.add-site-img');
  const assetArr = [...assetList];
  siteData = {
    isLoadComplete: false,
    sections: [...new Set(assetArr
      .map(element => getSectionAttribute(element)))]
      .map(name => ({
        allHiResAssetsLoaded: false,
        allInitialAssetsLoaded: false,
        assets: assetArr
          .filter(asset => getSectionAttribute(asset) === name)
          .map(element => (new SiteImage({
            element,
            isLoaded: false,
            loadStarted: false,
          }))),
        hiResAsssets: [],
        isActive: false,
        name,
      }))
      .concat({
        allHiResAssetsLoaded: false,
        allInitialAssetsLoaded: false,
        assets: [],
        hiResAsssets: [],
        isActive: false,
        name: 'about',
      }),
    selectedSection: '',
  };
  // console.log(siteData);
};

const updateSiteData = (options) => {
  Object.entries(options).forEach((arr) => {
    const [prop, value] = arr;
    siteData[prop] = value;
  });
  // console.log(siteData);
};

const updateSectionData = (options) => {
  const { name } = options;
  // Updates only selected section data
  const section = siteData.sections.find(s => s.name === name);
  if (section) {
    Object.entries(options).forEach((arr) => {
      const [prop, value] = arr;
      section[prop] = value;
    });
    // console.log(siteData);
  }
};

const getSectionByName = name => (
  siteData.sections.find(section => section.name === name)
);

const getActiveSectionName = () => (
  siteData.sections.find(section => section.isActive)
);

export {
  getActiveSectionName,
  getSectionByName,
  getSiteData,
  initSiteData,
  updateSectionData,
  updateSiteData,
};
