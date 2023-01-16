/* eslint-disable import/prefer-default-export */
const getLoadData = () => {
  const assetList = document.querySelectorAll('.add-site-img');
  const assetArr = [...assetList];
  return [...new Set(assetArr
    .map(element => element.getAttribute('data-section')))]
    .map(name => ({
      allHiResAssetsLoaded: false,
      allInitialAssetsLoaded: false,
      assets: assetArr
        .filter(asset => asset.getAttribute('data-section') === name)
        .map(element => ({
          element,
          isLoaded: false,
        })),
      hiResAsssets: [],
      name,
    }));
};

export {
  getLoadData,
};
/* eslint-enable import/prefer-default-export */
