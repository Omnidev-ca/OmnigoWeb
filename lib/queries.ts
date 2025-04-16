export const homePageQuery = `
*[_type == "page" && slug.current == "accueil"][0] {
  _id,
  title {
    fr,
    en
  },
  slug,
  seoDescription {
    fr,
    en
  },
  sections[] {
    _key,
    title {
      fr,
      en
    },
    contents[] {
      _key,
      type,
      text {
        fr,
        en
      },
      image {
        asset->{
          _id,
          url,
          metadata {
            dimensions
          }
        },
        hotspot,
        crop
      },
      card {
        title {
          fr,
          en
        },
        description {
          fr,
          en
        },
        image {
          asset->{
            _id,
            url,
            metadata {
              dimensions
            }
          },
          hotspot,
          crop
        },
        additionalTexts[] {
          fr,
          en
        },
        additionalImages[] {
          asset->{
            _id,
            url,
            metadata {
              dimensions
            }
          },
          hotspot,
          crop
        }
      }
    }
  }
}
  `