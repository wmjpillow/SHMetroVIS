#proof:
echo "weasel words: "
sh bin/weasel.sh sec*.tex
echo
echo "passive voice: "
sh bin/passive.sh sec*.tex
echo
echo "repeats: "
sh bin/repeats.sh sec*.tex
echo
echo "illusions: "
perl bin/lexical_illusions.pl sec*.tex
echo
echo "duplicates: "
perl bin/dup.pl sec*.tex
