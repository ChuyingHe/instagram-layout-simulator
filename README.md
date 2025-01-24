# instagram-layout-simulator

This simulator helps you plan your instagram posts. The simulator ONLY consinders the medium that will be saved in the account homepage, which are `post` and `reel`, and EXCLUDEs `story`.

Both `post` and `reel` should be saved under the directory `./medium`. For each media has a corresponding `txt` file to save the text. Naming convention should be:

<pre><code>
<!-- the media -->
[index].[media_name].[format]
<!-- the text -->
[index].txt
</code></pre>

So the `./medium` directory should looks like this:

<pre><code>
./medium
├── 1.txt
├── 1.20241021225620.jpg
├── 2.ap.txt
├── 2.ap.png
...
</code></pre>

# Tag generator

in `src/assets` folder, create a `tag/` folder and run this command:

```bash
# Generate 100 files with random tags, file name is 1.txt - 100.txt
# change the index if necessary
for run in {1..100}; do cat tags.txt | shuf -n 10 - | tr '\n' ' ' > tag/${run}.txt; done
```

Now you can move the files into `src/medium`
