# instagram-layout-simulator

This simulator helps you plan your instagram posts. The simulator ONLY consinders the medium that will be saved in the account homepage, which are `post` and `reel`, and EXCLUDEs `story`.

Both `post` and `reel` should be saved under the directory `./medium`. For each media has a corresponding `rtf` file to save the text. Naming convention should be:

<pre><code>
<!-- the media -->
[index]_[media_name].[format]
<!-- the text -->
[index].rtf
</code></pre>

So the `./medium` directory should looks like this:

<pre><code>
./medium
├── 1.rtf
├── 1_20241021225620.jpg
├── 2_ap.rtf
├── 2_ap.png
...
</code></pre>
