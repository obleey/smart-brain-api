const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");
const { response } = require("express");

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", "Key ");

const handleApiCall = (req,res)=>{
  stub.PostModelOutputs(
    {
      // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
      model_id: "aaa03c23b3724a16a56b629203edc62c",
      inputs: [{data: {image: {url: req.body.input}}}]
    },
    metadata,
    (err, response) => {
      if (err) {
        console.log("Error: " + err);
        return;
      }

      if (response.status.code !== 10000) {
        console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
        return;
      }

      console.log("Predicted concepts, with confidence values:")
      for (const c of response.outputs[0].data.concepts) {
        console.log(c.name + ": " + c.value);
      }
      res.json(response)
    }
  );
}
