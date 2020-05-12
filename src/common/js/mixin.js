import { mapActions, mapGetters } from 'vuex'

export const searchMixin = {
  data () {
    return {
      query: '',
      showResult: false
    }
  },
  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods: {
    addQuery (query) {
      this.$refs.searchBox.setQuery(query)
      this.saveSearch(query)
    },
    changeQuery (newQuery) {
      if (!newQuery) {
        this.showResult = false
        this.$router.push({ path: '/search' })
      }
      this.query = newQuery
    },
    saveSearch (query) {
      this.showResult = true
      this.$router.push({ path: `/search/${query}` })
      this.saveSearchHistory(query)
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory'
    ])
  }
}
