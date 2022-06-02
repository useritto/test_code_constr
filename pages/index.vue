<script>
export default {
  name: "index",
  middleware: [
    function ({redirect}) {
      redirect('/users');
    },
  ],
}
</script>
