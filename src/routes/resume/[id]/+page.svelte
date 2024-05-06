<script lang="ts">
    export let data;
    console.log('data: ', data);
  
  </script>
  
  <div class="wrapper">
    <div class="container mx-auto p-8 space-y-8">
    
    <p><strong>Name:</strong> {data.name}</p>
    <p><strong>Email:</strong> {data.email}</p>
    <p><strong>Phone:</strong> {data.phone}</p>
    <p><strong>DOB:</strong> {data.dob}</p>
    
    <p><strong>Address:</strong></p>
    <p><strong>House:</strong> {data.address.house_name}</p>
    </div>
  </div>
  <style>
    .row {
      display: flex;
    }
    .row span {
      width: 300px
    }
  </style>