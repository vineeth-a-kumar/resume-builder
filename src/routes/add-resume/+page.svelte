<script>
    import { Accordion, AccordionItem, InputChip } from '@skeletonlabs/skeleton';
    export let data;
    let skills = []
    let hobbies = []
    console.log('data: ', data);
    function validate(e) {
        console.log('validate')
        const formData = new FormData(e.target);

        const data = {};
        for (let field of formData) {
        const [key, value] = field;
        data[key] = value;
        }
        console.log(data)
    }
    
  </script>
  
  <div class="wrapper">
    <div class="container mx-auto p-8 space-y-8">
    <h1 class="h1">Add Resumes</h1>
    <div class="card size-1/2 p-4">


        <form on:submit|preventDefault={validate}>
        <Accordion autocollapse>
            <AccordionItem open>
                <svelte:fragment slot="summary">Basic Details</svelte:fragment>
                <svelte:fragment slot="content">
                    <label class="label mb-3">
                        <input class="input h-10 px-3" type="text" placeholder="Input" 
                        name="name"
                        value=""/>
                    </label>
                    <label class="label mb-3">
                        <input class="input h-10 px-3" type="email" placeholder="E-mail"
                        name="email"
                        value="" />
                    </label>
                    <label class="dob mb-3">
                        <input class="input h-10 px-3" type="date" placeholder="xx/xx/xxxx"
                        name="dob"
                        value="" />
                    </label>
                    <label class="label mb-3">
                        <input class="input h-10 px-3" type="number" placeholder="Phone"
                        
        name="phone"
        value="" />
                    </label>
                </svelte:fragment>
            </AccordionItem>
            <AccordionItem>
                <svelte:fragment slot="summary">Address</svelte:fragment>
                <svelte:fragment slot="content">
                    <label class="label mb-3">
                        <input class="input h-10 px-3" type="text" placeholder="House Name/No" />
                    </label>
                    <label class="label mb-3">
                        <input class="input h-10 px-3" type="text" placeholder="Street" />
                    </label>
                    <label class="dob mb-3">
                        <input class="input h-10 px-3" type="text" placeholder="City" />
                    </label>
                    <label class="label mb-3">
                        <input class="input h-10 px-3" type="text" placeholder="State" />
                    </label>
                    <label class="label mb-3">
                        <input class="input h-10 px-3" type="number" placeholder="Pin/Zipcode" />
                    </label>
                </svelte:fragment>
            </AccordionItem>

            <AccordionItem>
                <svelte:fragment slot="summary">Skills</svelte:fragment>
                <svelte:fragment slot="content">
                    <InputChip bind:value={skills} name="chips" placeholder="Enter any value..." />
                </svelte:fragment>
            </AccordionItem>
            <AccordionItem>
                <svelte:fragment slot="summary">Hobbies</svelte:fragment>
                <svelte:fragment slot="content">
                    <InputChip bind:value={hobbies} name="chips" placeholder="Enter any value..." />
                </svelte:fragment>
            </AccordionItem>

            <AccordionItem>
                <svelte:fragment slot="summary">Projects</svelte:fragment>
                <svelte:fragment slot="content">
                    <div>
                        <label class="label mb-3">
                            <input class="input h-10 px-3" type="text" placeholder="title" />
                        </label>
                        <label class="label mb-3">
                            <textarea class="textarea px-3" rows="4" placeholder="description" />
                        </label>
                    </div>
                    <button class="btn variant-filled-secondary">add project</button>
                </svelte:fragment>
            </AccordionItem>
        </Accordion>

        <button type="submit">
            Submit
        </button>
    </form>
    </div>
    </div>
  </div>
  <style>
  </style>