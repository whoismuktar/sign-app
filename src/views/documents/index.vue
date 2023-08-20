<template>
  <div class="all-documents">
    <h1 class="text-center">All Documents</h1>

    <v-container>
      <div v-if="documents.length < 1" class="my-10 text-center">
        No Documents
      </div>
      <v-row v-else>
        <div>1</div>
        <v-col v-for="(doc, index) in documents" :key="index" cols="12" md="4">
          <doc-card :document="doc" />
          <div class="doc-name text-center">Document {{ index + 1 }}</div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import docCard from "@/components/DocCard";
import { getdocuments } from "@/services/documents";
export default {
  components: {
    docCard,
  },
  data() {
    return {
      documents: [],
    };
  },
  computed: {},
  methods: {
    async fetchDocuments() {
      try {
        const res = await getdocuments();
        this.documents = res.data.data;
      } catch (error) {
        console.log({ error });
      }
    },
  },
  created() {
    this.fetchDocuments();
  },
};
</script>

<style></style>
