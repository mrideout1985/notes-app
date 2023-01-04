# Start the front-end server in a new tab using the Bash profile
wt new-tab --bash --profile Bash bash -ic "$(echo -e 'cd front-end\nnpm run dev')"
wt new-tab --bash --profile Bash bash -ic "$(echo -e 'cd back-end\nnpm run start:dev')"



