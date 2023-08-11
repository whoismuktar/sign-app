<template>
  <div class="single-doc">
    <pre>{{ document }}</pre>
    <!-- TODO Inivlaid Fallback component -->
    <!-- TODO Not Found Fallback component -->
    <!-- TODO Loader component -->
  </div>
</template>

<script>
import { getdocuments, getSingleDoc } from "@/services/documents";
export default {
  data() {
    return {
      document: {},
    };
  },
  methods: {
    async fetchSingleDoc() {
      try {
        const res = await getSingleDoc(this.docId);
        this.document = res.data;
      } catch (error) {
        console.log({ error });
      }
    },
  },
  computed: {
    docId() {
      return this.$route.params.docId;
    },
  },
  created() {
    this.fetchSingleDoc();
  },
  async mounted() {
    const docs = await getdocuments();
    console.log({ docs });
  },
};
</script>

<style></style>
