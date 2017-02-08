{
	"extends": "stylelint-config-standard",
	"rules": {
		"indentation": null,
		"comment-empty-line-before": ["never", {
			except: ["first-nested"],
			ignore: ["between-comments", "stylelint-commands"]
		}],
	    "declaration-empty-line-before": [ "always", {
	    	except: [
	    		"first-nested",
	    	],
	      	ignore: [
	      		"after-declaration",
	        	"after-comment",
	        	"inside-single-line-block",
	      	],
	    }],
	}
}